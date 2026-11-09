// GoDental 患者端 - 手势支持和移动端增强

(function() {
    'use strict';

    // 手势管理器
    class GestureManager {
        constructor(element) {
            this.element = element;
            this.startX = 0;
            this.startY = 0;
            this.startTime = 0;
            this.isMoving = false;
            this.threshold = 50;
            this.restraint = 100;
            this.allowedTime = 500;
            
            this.handlers = {
                swipeLeft: [],
                swipeRight: [],
                swipeUp: [],
                swipeDown: [],
                tap: [],
                longPress: []
            };
            
            this.init();
        }
        
        init() {
            this.element.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
            this.element.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: true });
            this.element.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
            this.element.addEventListener('touchcancel', this.handleTouchEnd.bind(this), { passive: true });
        }
        
        handleTouchStart(e) {
            const touch = e.changedTouches[0];
            this.startX = touch.pageX;
            this.startY = touch.pageY;
            this.startTime = new Date().getTime();
            this.isMoving = false;
            
            // 长按检测
            this.longPressTimer = setTimeout(() => {
                this.trigger('longPress', { x: this.startX, y: this.startY });
            }, 800);
        }
        
        handleTouchMove(e) {
            if (this.longPressTimer) {
                clearTimeout(this.longPressTimer);
                this.longPressTimer = null;
            }
            this.isMoving = true;
        }
        
        handleTouchEnd(e) {
            if (this.longPressTimer) {
                clearTimeout(this.longPressTimer);
                this.longPressTimer = null;
            }
            
            const touch = e.changedTouches[0];
            const distX = touch.pageX - this.startX;
            const distY = touch.pageY - this.startY;
            const elapsedTime = new Date().getTime() - this.startTime;
            
            // 点击检测
            if (!this.isMoving && elapsedTime < 200 && Math.abs(distX) < 10 && Math.abs(distY) < 10) {
                this.trigger('tap', { x: touch.pageX, y: touch.pageY });
                return;
            }
            
            // 滑动检测
            if (elapsedTime <= this.allowedTime && Math.abs(distX) >= this.threshold && Math.abs(distY) <= this.restraint) {
                if (distX > 0) {
                    this.trigger('swipeRight', { distance: distX, duration: elapsedTime });
                } else {
                    this.trigger('swipeLeft', { distance: Math.abs(distX), duration: elapsedTime });
                }
            } else if (elapsedTime <= this.allowedTime && Math.abs(distY) >= this.threshold && Math.abs(distX) <= this.restraint) {
                if (distY > 0) {
                    this.trigger('swipeDown', { distance: distY, duration: elapsedTime });
                } else {
                    this.trigger('swipeUp', { distance: Math.abs(distY), duration: elapsedTime });
                }
            }
            
            this.isMoving = false;
        }
        
        on(event, handler) {
            if (this.handlers[event]) {
                this.handlers[event].push(handler);
            }
            return this;
        }
        
        trigger(event, data) {
            if (this.handlers[event]) {
                this.handlers[event].forEach(handler => handler(data));
            }
        }
    }

    // 下拉刷新
    class PullToRefresh {
        constructor(element, callback) {
            this.element = element;
            this.callback = callback;
            this.startY = 0;
            this.currentY = 0;
            this.pulling = false;
            this.threshold = 80;
            this.maxPull = 120;
            
            this.indicator = document.createElement('div');
            this.indicator.className = 'pull-indicator';
            this.indicator.innerHTML = '<i class="fas fa-arrow-down"></i>';
            this.element.insertBefore(this.indicator, this.element.firstChild);
            
            this.init();
        }
        
        init() {
            this.element.addEventListener('touchstart', this.handleStart.bind(this), { passive: true });
            this.element.addEventListener('touchmove', this.handleMove.bind(this), { passive: true });
            this.element.addEventListener('touchend', this.handleEnd.bind(this), { passive: true });
        }
        
        handleStart(e) {
            if (this.element.scrollTop === 0) {
                this.startY = e.touches[0].pageY;
                this.pulling = true;
            }
        }
        
        handleMove(e) {
            if (!this.pulling) return;
            
            this.currentY = e.touches[0].pageY;
            const diff = this.currentY - this.startY;
            
            if (diff > 0 && this.element.scrollTop === 0) {
                e.preventDefault();
                const pullDistance = Math.min(diff * 0.5, this.maxPull);
                this.indicator.style.top = `${pullDistance - 50}px`;
                
                const icon = this.indicator.querySelector('i');
                if (pullDistance >= this.threshold) {
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    icon.style.transform = 'rotate(0deg)';
                }
                
                this.indicator.classList.add('visible');
            }
        }
        
        handleEnd(e) {
            if (!this.pulling) return;
            
            const diff = this.currentY - this.startY;
            
            if (diff >= this.threshold && typeof this.callback === 'function') {
                this.indicator.classList.add('loading');
                this.indicator.querySelector('i').className = 'fas fa-spinner';
                
                this.callback().then(() => {
                    this.reset();
                });
            } else {
                this.reset();
            }
            
            this.pulling = false;
        }
        
        reset() {
            this.indicator.style.top = '-50px';
            this.indicator.classList.remove('visible', 'loading');
            this.indicator.querySelector('i').className = 'fas fa-arrow-down';
            this.indicator.querySelector('i').style.transform = 'rotate(0deg)';
        }
    }

    // 页面滑动切换
    class PageSwipeManager {
        constructor(app) {
            this.app = app;
            this.pages = ['home', 'appointments', 'profile'];
            this.currentIndex = 0;
            
            this.init();
        }
        
        init() {
            document.addEventListener('swipeLeft', () => this.nextPage());
            document.addEventListener('swipeRight', () => this.prevPage());
        }
        
        nextPage() {
            if (this.currentIndex < this.pages.length - 1) {
                this.currentIndex++;
                this.navigateTo(this.pages[this.currentIndex]);
            }
        }
        
        prevPage() {
            if (this.currentIndex > 0) {
                this.currentIndex--;
                this.navigateTo(this.pages[this.currentIndex]);
            }
        }
        
        navigateTo(page) {
            if (this.app && this.app.currentPage) {
                this.app.currentPage = page;
            }
        }
    }

    // 初始化
    document.addEventListener('DOMContentLoaded', () => {
        // 全局手势
        const gestureManager = new GestureManager(document.body);
        
        // 绑定左右滑动手势切换页面
        gestureManager.on('swipeLeft', () => {
            console.log('[Gesture] Swipe left detected');
            // 可以在这里添加页面切换逻辑
        });
        
        gestureManager.on('swipeRight', () => {
            console.log('[Gesture] Swipe right detected');
            // 返回上一页或切换标签
            if (window.history.length > 1) {
                window.history.back();
            }
        });
        
        // 初始化下拉刷新（如果存在主内容区域）
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            new PullToRefresh(mainContent, async () => {
                console.log('[PullToRefresh] Refreshing...');
                // 触发 Vue 应用的刷新方法
                if (window.app && window.app.loadAppointments) {
                    await window.app.loadAppointments();
                }
                return new Promise(resolve => setTimeout(resolve, 1000));
            });
        }
        
        // 双击返回顶部
        let lastTap = 0;
        document.addEventListener('touchend', (e) => {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            if (tapLength < 300 && tapLength > 0) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            lastTap = currentTime;
        });
        
        // 阻止双击缩放
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (e) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, { passive: false });
        
        console.log('[Gestures] Gesture support initialized');
    });

    // 导出到全局
    window.GestureManager = GestureManager;
    window.PullToRefresh = PullToRefresh;
    window.PageSwipeManager = PageSwipeManager;
})();
