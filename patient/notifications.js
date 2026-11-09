// GoDental 患者端 - 推送通知管理

(function() {
    'use strict';

    class NotificationManager {
        constructor() {
            this.permission = 'default';
            this.swRegistration = null;
            this.init();
        }
        
        async init() {
            // 检查通知支持
            if (!('Notification' in window)) {
                console.log('[Notification] Notifications not supported');
                return;
            }
            
            // 获取当前权限
            this.permission = Notification.permission;
            
            // 获取 Service Worker 注册
            if ('serviceWorker' in navigator) {
                const registrations = await navigator.serviceWorker.getRegistrations();
                if (registrations.length > 0) {
                    this.swRegistration = registrations[0];
                }
            }
            
            console.log('[Notification] Initialized, permission:', this.permission);
        }
        
        // 请求通知权限
        async requestPermission() {
            if (!('Notification' in window)) {
                return false;
            }
            
            try {
                const permission = await Notification.requestPermission();
                this.permission = permission;
                console.log('[Notification] Permission granted:', permission);
                return permission === 'granted';
            } catch (error) {
                console.error('[Notification] Error requesting permission:', error);
                return false;
            }
        }
        
        // 显示本地通知
        show(title, options = {}) {
            if (this.permission !== 'granted') {
                console.log('[Notification] Permission not granted');
                return;
            }
            
            const defaultOptions = {
                icon: '/patient/icons/icon-192x192.png',
                badge: '/patient/icons/icon-72x72.png',
                vibrate: [100, 50, 100],
                requireInteraction: false,
                tag: 'default',
                data: {}
            };
            
            const mergedOptions = { ...defaultOptions, ...options };
            
            // 使用 Service Worker 显示通知（支持后台）
            if (this.swRegistration) {
                this.swRegistration.showNotification(title, mergedOptions);
            } else {
                // 前台显示
                new Notification(title, mergedOptions);
            }
        }
        
        // 显示预约提醒
        showAppointmentReminder(appointment) {
            this.show('預約提醒', {
                body: `您有一個預約將在30分鐘後開始：${appointment.serviceName}`,
                icon: '/patient/icons/icon-192x192.png',
                badge: '/patient/icons/icon-72x72.png',
                tag: `appointment-${appointment.apptId}`,
                requireInteraction: true,
                actions: [
                    { action: 'view', title: '查看詳情' },
                    { action: 'dismiss', title: '忽略' }
                ],
                data: { appointmentId: appointment.apptId, type: 'reminder' }
            });
        }
        
        // 显示预约状态变更
        showAppointmentStatus(appointment, status) {
            const messages = {
                confirmed: `您的預約已確認：${appointment.serviceName}`,
                cancelled: `您的預約已被取消：${appointment.serviceName}`,
                completed: `您的預約已完成：${appointment.serviceName}`
            };
            
            this.show('預約狀態更新', {
                body: messages[status] || messages.confirmed,
                icon: '/patient/icons/icon-192x192.png',
                tag: `status-${appointment.apptId}`,
                data: { appointmentId: appointment.apptId, type: 'status', status }
            });
        }
        
        // 显示促销通知
        showPromotion(promotion) {
            this.show(promotion.title, {
                body: promotion.description,
                icon: '/patient/icons/icon-192x192.png',
                image: promotion.imageUrl,
                tag: `promo-${promotion.id}`,
                requireInteraction: false,
                data: { promotionId: promotion.id, type: 'promotion' }
            });
        }
        
        // 订阅推送（需要后端支持）
        async subscribe() {
            if (!this.swRegistration) {
                console.error('[Notification] Service Worker not registered');
                return null;
            }
            
            try {
                const subscription = await this.swRegistration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: this.urlBase64ToUint8Array(
                        'YOUR_VAPID_PUBLIC_KEY' // 需要替换为实际的 VAPID 公钥
                    )
                });
                
                console.log('[Notification] Push subscription:', subscription);
                
                // 发送到服务器保存
                await this.sendSubscriptionToServer(subscription);
                
                return subscription;
            } catch (error) {
                console.error('[Notification] Error subscribing:', error);
                return null;
            }
        }
        
        // 取消订阅
        async unsubscribe() {
            if (!this.swRegistration) return;
            
            try {
                const subscription = await this.swRegistration.pushManager.getSubscription();
                if (subscription) {
                    await subscription.unsubscribe();
                    await this.removeSubscriptionFromServer(subscription);
                    console.log('[Notification] Unsubscribed');
                }
            } catch (error) {
                console.error('[Notification] Error unsubscribing:', error);
            }
        }
        
        // 发送订阅到服务器
        async sendSubscriptionToServer(subscription) {
            try {
                const baseUrl = (typeof window !== 'undefined' && window.API_BASE_URL) || '';
                const response = await fetch(`${baseUrl}/api/notifications/subscribe`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ subscription, userType: 'patient' })
                });
                return response.ok;
            } catch (error) {
                console.error('[Notification] Error sending subscription:', error);
                return false;
            }
        }
        
        // 从服务器移除订阅
        async removeSubscriptionFromServer(subscription) {
            try {
                const baseUrl = (typeof window !== 'undefined' && window.API_BASE_URL) || '';
                const response = await fetch(`${baseUrl}/api/notifications/unsubscribe`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ endpoint: subscription.endpoint })
                });
                return response.ok;
            } catch (error) {
                console.error('[Notification] Error removing subscription:', error);
                return false;
            }
        }
        
        // Base64 转 Uint8Array
        urlBase64ToUint8Array(base64String) {
            const padding = '='.repeat((4 - base64String.length % 4) % 4);
            const base64 = (base64String + padding)
                .replace(/\-/g, '+')
                .replace(/_/g, '/');
            
            const rawData = window.atob(base64);
            const outputArray = new Uint8Array(rawData.length);
            
            for (let i = 0; i < rawData.length; ++i) {
                outputArray[i] = rawData.charCodeAt(i);
            }
            return outputArray;
        }
    }

    // 初始化通知管理器
    document.addEventListener('DOMContentLoaded', () => {
        window.notificationManager = new NotificationManager();
        
        // 自动请求权限（如果之前未决定）
        if ('Notification' in window && Notification.permission === 'default') {
            setTimeout(() => {
                window.notificationManager.requestPermission();
            }, 5000); // 5秒后弹出
        }
    });
})();
