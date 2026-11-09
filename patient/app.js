// 病人前端应用 - GoDental Shenzhen (含多语言支持)
const { createApp, ref, computed, onMounted, watch, provide, inject, nextTick } = Vue;

// ==================== i18n 多语言支持 ====================
const i18n = {
    'zh-CN': {
        appName: '深圳睇牙', loading: '加载中...', save: '保存', cancel: '取消', confirm: '确认',
        delete: '删除', edit: '编辑', back: '返回', search: '搜索', submit: '提交', close: '关闭',
        login: '登录', register: '注册', logout: '退出登录', email: '邮箱地址', password: '密码',
        confirmPassword: '确认密码', name: '姓名', phone: '电话', loginButton: '登录', registerButton: '注册',
        noAccount: '还没有账号？', hasAccount: '已有账号？', registerNow: '立即注册', loginNow: '立即登录',
        passwordMinLength: '密码长度至少6位', passwordMismatch: '两次输入的密码不一致', loginSuccess: '登录成功！',
        registerSuccess: '注册成功！', logoutSuccess: '已退出登录', home: '首页', searchPlaceholder: '搜索诊所...',
        recommendedClinics: '推荐诊所', noClinicsFound: '未找到诊所', clinic: '诊所', address: '地址',
        phoneNum: '电话', rating: '评分', reviews: '评价', businessHours: '营业时间',
        selectDoctor: '选择医生', doctor: '医生', title: '职称', specialty: '专科',
        consultationFee: '咨询费', experience: '经验', years: '年', bookAppointment: '预约',
        myAppointments: '我的预约', selectDate: '选择日期', selectTime: '选择时间', appointmentDetails: '预约详情',
        symptoms: '症状描述', symptomsPlaceholder: '请描述您的症状...', notes: '备注', notesPlaceholder: '其他备注...', specialServices: '特殊服务需求', needTransportation: '需要车接送', needTranslation: '需要翻译服务', transportDesc: '我们将安排车辆接送您往返诊所', translationDesc: '我们将提供专业翻译陪同就诊', noSpecialServices: '无特殊服务需求', serviceContact: '服务联系信息', servicePhone: '服务联系电话', servicePhonePlaceholder: '请输入您的联系电话', servicePhoneHint: '此电话将用于车接送和翻译服务联系', transportAddress: '接送地址', transportAddressPlaceholder: '请输入详细接送地址', translationLanguage: '翻译语言', pleaseSelect: '请选择', other: '其他',
        submitAppointment: '确认预约', bookingSuccess: '预约成功！', noTimeSlots: '该日期暂无可用时段', today: '今天',
        statusAll: '全部', statusPending: '待确认', statusConfirmed: '已确认', statusInProgress: '治疗中',
        statusCompleted: '已完成', statusCancelled: '已取消', orderNo: '订单号', appointmentDate: '预约日期',
        appointmentTime: '预约时间', clinicName: '诊所', service: '服务', fee: '费用', paid: '已支付',
        unpaid: '未支付', cancelAppointment: '取消预约', cancelConfirm: '确定要取消这个预约吗？',
        cancelSuccess: '预约已取消', noAppointments: '暂无相关预约', profile: '我的', myProfile: '个人资料',
        editProfile: '编辑资料', settings: '设置', help: '帮助与反馈', language: '语言',
        languageCN: '简体中文', languageHK: '繁體中文', languageEN: 'English', languageAR: 'العربية',
        saveSuccess: '资料已更新', notSet: '未设置', notifications: '通知', noNotifications: '暂无新通知',
        error: '错误', networkError: '网络错误，请稍后再试', loginExpired: '登录已过期，请重新登录',
        days: ['日', '一', '二', '三', '四', '五', '六'],
        confirmAppointment: '确认预约信息', confirmNotice: '请确认以上信息无误后提交预约',
        viewDetail: '查看详情', appointmentInfo: '预约信息', clinicInfo: '诊所信息', paymentInfo: '支付信息',
        paymentStatus: '支付状态', totalAmount: '合计金额', remarks: '备注', createdAt: '创建时间', updatedAt: '更新时间',
        orLoginWith: '或使用以下方式登录', loginWithApple: '使用 Apple 登录', loginWithGoogle: '使用 Google 登录', socialNotAvailable: '暂未开放',
        aiTriage: 'AI 导诊', aiTriageDesc: '描述症状，AI 为您建议就诊方向并推荐医生',
        aiWelcome: '您好，我是 GoDental 口腔导诊助手 🦷\n\n请描述您的口腔问题（如："左下智齿疼了三天，牙龈肿了"），我会为您建议就诊方向并推荐合适的医生。\n\n也可以点击下方常见症状快速开始：',
        aiThinking: '正在分析...', aiSuggestedLabel: '建议就诊方向：', aiRecommendedLabel: '推荐医生：', aiReviewsUnit: '条评价',
        aiSourceAi: '🤖 AI 智能生成', aiSourceFallback: '📋 规则匹配',
        aiInputPlaceholder: '描述您的口腔问题...', aiSymptomTooShort: '请描述您的症状',
        aiErrorReply: '抱歉，服务暂时繁忙，请稍后再试。您也可以直接浏览诊所查找合适的医生。'
    },
    'zh-HK': {
        appName: '深圳睇牙', loading: '載入中...', save: '儲存', cancel: '取消', confirm: '確認',
        delete: '刪除', edit: '編輯', back: '返回', search: '搜索', submit: '提交', close: '關閉',
        login: '登入', register: '註冊', logout: '退出登入', email: '電郵地址', password: '密碼',
        confirmPassword: '確認密碼', name: '姓名', phone: '電話', loginButton: '登入', registerButton: '註冊',
        noAccount: '還沒有賬號？', hasAccount: '已有賬號？', registerNow: '立即註冊', loginNow: '立即登入',
        passwordMinLength: '密碼長度至少6位', passwordMismatch: '兩次輸入的密碼不一致', loginSuccess: '登入成功！',
        registerSuccess: '註冊成功！', logoutSuccess: '已退出登入', home: '首頁', searchPlaceholder: '搜索診所...',
        recommendedClinics: '推薦診所', noClinicsFound: '未找到診所', clinic: '診所', address: '地址',
        phoneNum: '電話', rating: '評分', reviews: '評價', businessHours: '營業時間',
        selectDoctor: '選擇醫生', doctor: '醫生', title: '職稱', specialty: '專科',
        consultationFee: '諮詢費', experience: '經驗', years: '年', bookAppointment: '預約',
        myAppointments: '我的預約', selectDate: '選擇日期', selectTime: '選擇時間', appointmentDetails: '預約詳情',
        symptoms: '症狀描述', symptomsPlaceholder: '請描述您的症狀...', notes: '備註', notesPlaceholder: '其他備註...', specialServices: '特殊服務需求', needTransportation: '需要車接送', needTranslation: '需要翻譯服務', transportDesc: '我們將安排車輛接送您往返診所', translationDesc: '我們將提供專業翻譯陪同就診', noSpecialServices: '無特殊服務需求', serviceContact: '服務聯繫資訊', servicePhone: '服務聯繫電話', servicePhonePlaceholder: '請輸入您的聯繫電話', servicePhoneHint: '此電話將用於車接送和翻譯服務聯繫', transportAddress: '接送地址', transportAddressPlaceholder: '請輸入詳細接送地址', translationLanguage: '翻譯語言', pleaseSelect: '請選擇', other: '其他',
        submitAppointment: '確認預約', bookingSuccess: '預約成功！', noTimeSlots: '該日期暫無可用時段', today: '今天',
        statusAll: '全部', statusPending: '待確認', statusConfirmed: '已確認', statusInProgress: '治療中',
        statusCompleted: '已完成', statusCancelled: '已取消', orderNo: '訂單號', appointmentDate: '預約日期',
        appointmentTime: '預約時間', clinicName: '診所', service: '服務', fee: '費用', paid: '已支付',
        unpaid: '未支付', cancelAppointment: '取消預約', cancelConfirm: '確定要取消這個預約嗎？',
        cancelSuccess: '預約已取消', noAppointments: '暫無相關預約', profile: '我的', myProfile: '個人資料',
        editProfile: '編輯資料', settings: '設置', help: '幫助與反饋', language: '語言',
        languageCN: '简体中文', languageHK: '繁體中文', languageEN: 'English', languageAR: 'العربية',
        saveSuccess: '資料已更新', notSet: '未設置', notifications: '通知', noNotifications: '暫無新通知',
        error: '錯誤', networkError: '網絡錯誤，請稍後再試', loginExpired: '登入已過期，請重新登入',
        days: ['日', '一', '二', '三', '四', '五', '六'],
        confirmAppointment: '確認預約信息', confirmNotice: '請確認以上信息無誤後提交預約',
        viewDetail: '查看詳情', appointmentInfo: '預約資訊', clinicInfo: '診所資訊', paymentInfo: '支付資訊',
        paymentStatus: '支付狀態', totalAmount: '合計金額', remarks: '備註', createdAt: '創建時間', updatedAt: '更新時間',
        orLoginWith: '或使用以下方式登入', loginWithApple: '使用 Apple 登入', loginWithGoogle: '使用 Google 登入', socialNotAvailable: '暫未開放',
        aiTriage: 'AI 導診', aiTriageDesc: '描述症狀，AI 為您建議就診方向並推薦醫生',
        aiWelcome: '您好，我是 GoDental 口腔導診助手 🦷\n\n請描述您的口腔問題（如：「左下智慧齒痛了三天，牙齦腫了」），我會為您建議就診方向並推薦合適的醫生。\n\n也可以點擊下方常見症狀快速開始：',
        aiThinking: '正在分析...', aiSuggestedLabel: '建議就診方向：', aiRecommendedLabel: '推薦醫生：', aiReviewsUnit: '條評價',
        aiSourceAi: '🤖 AI 智能生成', aiSourceFallback: '📋 規則匹配',
        aiInputPlaceholder: '描述您的口腔問題...', aiSymptomTooShort: '請描述您的症狀',
        aiErrorReply: '抱歉，服務暫時繁忙，請稍後再試。您也可以直接瀏覽診所查找合適的醫生。'
    },
    'en': {
        appName: 'GoDental Shenzhen', loading: 'Loading...', save: 'Save', cancel: 'Cancel', confirm: 'Confirm',
        delete: 'Delete', edit: 'Edit', back: 'Back', search: 'Search', submit: 'Submit', close: 'Close',
        login: 'Login', register: 'Register', logout: 'Logout', email: 'Email Address', password: 'Password',
        confirmPassword: 'Confirm Password', name: 'Name', phone: 'Phone', loginButton: 'Login', registerButton: 'Register',
        noAccount: "Don't have an account?", hasAccount: 'Already have an account?', registerNow: 'Register Now', loginNow: 'Login Now',
        passwordMinLength: 'Password must be at least 6 characters', passwordMismatch: 'Passwords do not match', loginSuccess: 'Login successful!',
        registerSuccess: 'Registration successful!', logoutSuccess: 'Logged out successfully', home: 'Home', searchPlaceholder: 'Search clinics...',
        recommendedClinics: 'Recommended Clinics', noClinicsFound: 'No clinics found', clinic: 'Clinic', address: 'Address',
        phoneNum: 'Phone', rating: 'Rating', reviews: 'reviews', businessHours: 'Business Hours',
        selectDoctor: 'Select Doctor', doctor: 'Doctor', title: 'Title', specialty: 'Specialty',
        consultationFee: 'Consultation Fee', experience: 'Experience', years: 'years', bookAppointment: 'Book Appointment',
        myAppointments: 'My Appointments', selectDate: 'Select Date', selectTime: 'Select Time', appointmentDetails: 'Appointment Details',
        symptoms: 'Symptoms', symptomsPlaceholder: 'Please describe your symptoms...', notes: 'Notes', notesPlaceholder: 'Other notes...', specialServices: 'Special Services', needTransportation: 'Need Transportation', needTranslation: 'Need Translation', transportDesc: 'We will arrange transportation for you', translationDesc: 'We will provide professional translation', noSpecialServices: 'No special services required', serviceContact: 'Service Contact', servicePhone: 'Contact Phone', servicePhonePlaceholder: 'Enter your contact phone', servicePhoneHint: 'This phone will be used for transportation and translation services', transportAddress: 'Pickup Address', transportAddressPlaceholder: 'Enter detailed pickup address', translationLanguage: 'Language', pleaseSelect: 'Please select', other: 'Other',
        submitAppointment: 'Confirm Booking', bookingSuccess: 'Booking successful!', noTimeSlots: 'No available slots for this date', today: 'Today',
        statusAll: 'All', statusPending: 'Pending', statusConfirmed: 'Confirmed', statusInProgress: 'In Progress',
        statusCompleted: 'Completed', statusCancelled: 'Cancelled', orderNo: 'Order No.', appointmentDate: 'Appointment Date',
        appointmentTime: 'Appointment Time', clinicName: 'Clinic', service: 'Service', fee: 'Fee', paid: 'Paid',
        unpaid: 'Unpaid', cancelAppointment: 'Cancel Appointment', cancelConfirm: 'Are you sure you want to cancel this appointment?',
        cancelSuccess: 'Appointment cancelled', noAppointments: 'No appointments', profile: 'Profile', myProfile: 'My Profile',
        editProfile: 'Edit Profile', settings: 'Settings', help: 'Help & Feedback', language: 'Language',
        languageCN: '简体中文', languageHK: '繁體中文', languageEN: 'English', languageAR: 'العربية',
        saveSuccess: 'Profile updated', notSet: 'Not set', notifications: 'Notifications', noNotifications: 'No new notifications',
        error: 'Error', networkError: 'Network error, please try again later', loginExpired: 'Session expired, please login again',
        days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        confirmAppointment: 'Confirm Appointment', confirmNotice: 'Please confirm the information above before submitting',
        viewDetail: 'View Details', appointmentInfo: 'Appointment Info', clinicInfo: 'Clinic Info', paymentInfo: 'Payment Info',
        paymentStatus: 'Payment Status', totalAmount: 'Total Amount', remarks: 'Remarks', createdAt: 'Created', updatedAt: 'Updated',
        orLoginWith: 'Or sign in with', loginWithApple: 'Sign in with Apple', loginWithGoogle: 'Sign in with Google', socialNotAvailable: 'Not available yet',
        aiTriage: 'AI Triage', aiTriageDesc: 'Describe your symptoms and AI will suggest specialties & dentists',
        aiWelcome: 'Hello, I am the GoDental dental triage assistant 🦷\n\nPlease describe your dental problem (e.g. "My lower-left wisdom tooth has hurt for three days and the gum is swollen"). I will suggest the right specialty and recommend suitable dentists.\n\nYou can also tap a common symptom below to start:',
        aiThinking: 'Analyzing...', aiSuggestedLabel: 'Suggested specialties:', aiRecommendedLabel: 'Recommended dentists:', aiReviewsUnit: ' reviews',
        aiSourceAi: '🤖 AI Generated', aiSourceFallback: '📋 Rule-based',
        aiInputPlaceholder: 'Describe your dental problem...', aiSymptomTooShort: 'Please describe your symptoms',
        aiErrorReply: 'Sorry, the service is busy right now. Please try again later, or browse clinics to find a dentist directly.'
    },
    'ar': {
        appName: 'GoDental Shenzhen', loading: 'جاري التحميل...', save: 'حفظ', cancel: 'إلغاء', confirm: 'تأكيد',
        delete: 'حذف', edit: 'تعديل', back: 'رجوع', search: 'بحث', submit: 'إرسال', close: 'إغلاق',
        login: 'تسجيل الدخول', register: 'إنشاء حساب', logout: 'تسجيل الخروج', email: 'البريد الإلكتروني', password: 'كلمة المرور',
        confirmPassword: 'تأكيد كلمة المرور', name: 'الاسم', phone: 'الهاتف', loginButton: 'دخول', registerButton: 'إنشاء',
        noAccount: 'ليس لديك حساب؟', hasAccount: 'لديك حساب بالفعل؟', registerNow: 'سجل الآن', loginNow: 'سجل دخولك',
        passwordMinLength: 'يجب أن تكون كلمة المرور 6 أحرف على الأقل', passwordMismatch: 'كلمات المرور غير متطابقة', loginSuccess: 'تم تسجيل الدخول بنجاح!',
        registerSuccess: 'تم إنشاء الحساب بنجاح!', logoutSuccess: 'تم تسجيل الخروج', home: 'الرئيسية', searchPlaceholder: 'البحث في العيادات...',
        recommendedClinics: 'العيادات الموصى بها', noClinicsFound: 'لم يتم العثور على عيادات', clinic: 'العيادة', address: 'العنوان',
        phoneNum: 'الهاتف', rating: 'التقييم', reviews: 'تقييم', businessHours: 'ساعات العمل',
        selectDoctor: 'اختيار الطبيب', doctor: 'طبيب', title: 'اللقب', specialty: 'التخصص',
        consultationFee: 'رسوم الاستشارة', experience: 'الخبرة', years: 'سنوات', bookAppointment: 'حجز موعد',
        myAppointments: 'مواعيدي', selectDate: 'اختيار التاريخ', selectTime: 'اختيار الوقت', appointmentDetails: 'تفاصيل الموعد',
        symptoms: 'الأعراض', symptomsPlaceholder: 'يرجى وصف أعراضك...', notes: 'ملاحظات', notesPlaceholder: 'ملاحظات أخرى...', specialServices: 'خدمات خاصة', needTransportation: 'بحاجة لمواصلات', needTranslation: 'بحاجة لمترجم', transportDesc: 'سنقوم بتوفير مواصلات لك', translationDesc: 'سنقوم بتوفير مترجم محترف', noSpecialServices: 'لا تحتاج لخدمات خاصة', serviceContact: 'معلومات الاتصال', servicePhone: 'رقم الهاتف', servicePhonePlaceholder: 'أدخل رقم هاتفك', servicePhoneHint: 'سيتم استخدام هذا الهاتف للمواصلات والترجمة', transportAddress: 'عنوان الاستلام', transportAddressPlaceholder: 'أدخل عنوان الاستلام بالتفصيل', translationLanguage: 'اللغة', pleaseSelect: 'الرجاء الاختيار', other: 'أخرى',
        submitAppointment: 'تأكيد الحجز', bookingSuccess: 'تم الحجز بنجاح!', noTimeSlots: 'لا توجد أوقات متاحة لهذا التاريخ', today: 'اليوم',
        statusAll: 'الكل', statusPending: 'قيد الانتظار', statusConfirmed: 'مؤكد', statusInProgress: 'قيد العلاج',
        statusCompleted: 'مكتمل', statusCancelled: 'ملغى', orderNo: 'رقم الطلب', appointmentDate: 'تاريخ الموعد',
        appointmentTime: 'وقت الموعد', clinicName: 'العيادة', service: 'الخدمة', fee: 'الرسوم', paid: 'مدفوع',
        unpaid: 'غير مدفوع', cancelAppointment: 'إلغاء الموعد', cancelConfirm: 'هل أنت متأكد من إلغاء هذا الموعد؟',
        cancelSuccess: 'تم إلغاء الموعد', noAppointments: 'لا توجد مواعيع', profile: 'حسابي', myProfile: 'الملف الشخصي',
        editProfile: 'تعديل الملف', settings: 'الإعدادات', help: 'المساعدة والدعم', language: 'اللغة',
        languageCN: '简体中文', languageHK: '繁體中文', languageEN: 'English', languageAR: 'العربية',
        saveSuccess: 'تم تحديث الملف', notSet: 'غير محدد', notifications: 'الإشعارات', noNotifications: 'لا توجد إشعارات جديدة',
        error: 'خطأ', networkError: 'خطأ في الاتصال، يرجى المحاولة لاحقاً', loginExpired: 'انتهت الجلسة، يرجى تسجيل الدخول مرة أخرى',
        days: ['أحد', 'إثن', 'ثلا', 'أرب', 'خمي', 'جمع', 'سبت'],
        confirmAppointment: 'تأكيد الموعد', confirmNotice: 'يرجى تأكيد المعلومات أعلاه قبل التقديم',
        viewDetail: 'عرض التفاصيل', appointmentInfo: 'معلومات الموعد', clinicInfo: 'معلومات العيادة', paymentInfo: 'معلومات الدفع',
        paymentStatus: 'حالة الدفع', totalAmount: 'المجموع', remarks: 'ملاحظات', createdAt: 'تاريخ الإنشاء', updatedAt: 'تاريخ التحديث',
        orLoginWith: 'أو سجل الدخول عبر', loginWithApple: 'تسجيل الدخول عبر Apple', loginWithGoogle: 'تسجيل الدخول عبر Google', socialNotAvailable: 'غير متاح بعد',
        aiTriage: 'مساعد التشخيص الذكي', aiTriageDesc: 'صف أعراضك وسيقترح الذكاء الاصطناعي التخصص والطبيب المناسب',
        aiWelcome: 'مرحباً، أنا مساعد GoDental لتوجيه المرضى 🦷\n\nيرجى وصف مشكلتك السنية (مثل: «ضرس العقل السفلي الأيسر يؤلمني منذ ثلاثة أيام واللثة منتفخة»)، وسأقترح عليك التخصص المناسب وأرشح لك أطباء مناسبين.\n\nيمكنك أيضاً الضغط على أحد الأعراض الشائعة أدناه للبدء:',
        aiThinking: 'جاري التحليل...', aiSuggestedLabel: 'التخصصات المقترحة:', aiRecommendedLabel: 'أطباء مقترحون:', aiReviewsUnit: ' تقييم',
        aiSourceAi: '🤖 تم إنشاؤه بالذكاء الاصطناعي', aiSourceFallback: '📋 مطابقة بالقواعد',
        aiInputPlaceholder: 'صف مشكلتك السنية...', aiSymptomTooShort: 'يرجى وصف الأعراض',
        aiErrorReply: 'عذراً، الخدمة مشغولة حالياً، يرجى المحاولة لاحقاً. يمكنك أيضاً تصفح العيادات للعثور على طبيب مناسب مباشرة.'
    }
};

// 检测浏览器语言
function detectLanguage() {
    // 首先检查是否与首页共享的语言设置
    const sharedLang = localStorage.getItem('dentalpro_lang');
    if (sharedLang && i18n[sharedLang]) {
        return sharedLang;
    }
    
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('zh-CN') || browserLang.startsWith('zh-Hans')) return 'zh-CN';
    if (browserLang.startsWith('zh') || browserLang.startsWith('zh-Hant')) return 'zh-HK';
    if (browserLang.startsWith('ar')) return 'ar';
    return 'en';
}

// 是否是 RTL 语言
function isRTL(lang) {
    return lang === 'ar';
}

// 获取语言信息
function getLangInfo(lang) {
    const info = {
        'zh-CN': { name: '简体中文', flag: '🇨🇳', dir: 'ltr' },
        'zh-HK': { name: '繁體中文', flag: '🇭🇰', dir: 'ltr' },
        'en': { name: 'English', flag: '🇬🇧', dir: 'ltr' },
        'ar': { name: 'العربية', flag: '🇸🇦', dir: 'rtl' }
    };
    return info[lang] || info['en'];
}

// ==================== Vue 应用 ====================
const app = createApp({
    setup() {
        // ==================== 配置 ====================
        // API 地址配置
        // 线上环境使用域名，本地调试可通过 localStorage 覆盖
        // 例如：localStorage.setItem('server_url', 'http://192.168.1.x:5001')
        const API_BASE_URL = localStorage.getItem('server_url') || 'https://godental.cyou';
        window.API_BASE_URL = API_BASE_URL;

        // 第三方社交登录配置（需与后端 appsettings 的 SocialAuth 段保持一致）
        // 占位符 __SET_VIA_ENV_VAR__ 表示未配置，对应按钮置灰提示“暂未开放”
        const SOCIAL_AUTH = {
            appleClientId: '__SET_VIA_ENV_VAR__',   // Apple Services ID，如 com.godental.web
            appleRedirectURI: window.location.origin + '/patient/',
            googleClientId: '__SET_VIA_ENV_VAR__'   // Google OAuth Client ID（Web 应用类型）
        };
        const socialAuth = {
            appleEnabled: !!(SOCIAL_AUTH.appleClientId && !SOCIAL_AUTH.appleClientId.startsWith('__')),
            googleEnabled: !!(SOCIAL_AUTH.googleClientId && !SOCIAL_AUTH.googleClientId.startsWith('__'))
        };
        
        // ==================== 语言设置 ====================
        const currentLang = ref(detectLanguage());
        
        // 同步语言到首页共享存储
        const syncLanguage = (lang) => {
            localStorage.setItem('lang', lang);
            localStorage.setItem('dentalpro_lang', lang);
        };
        const isRtl = computed(() => isRTL(currentLang.value));
        
        // 翻译函数
        const t = (key, params = {}) => {
            const translations = i18n[currentLang.value] || i18n['zh-HK'];
            let value = translations[key];
            if (value === undefined) value = i18n['zh-HK'][key];
            if (typeof value === 'string' && Object.keys(params).length > 0) {
                return value.replace(/\{(\w+)\}/g, (match, p) => params[p] || match);
            }
            return value || key;
        };
        
        // 切换语言
        const changeLanguage = (lang) => {
            currentLang.value = lang;
            localStorage.setItem('lang', lang);
            // 关闭语言菜单
            showLangMenu.value = false;
            // 更新文档方向
            document.documentElement.dir = isRtl.value ? 'rtl' : 'ltr';
            document.documentElement.lang = lang;
            // 更新标题
            document.title = t('appName');
        };
        
        // 初始化语言
        onMounted(() => {
            document.documentElement.dir = isRtl.value ? 'rtl' : 'ltr';
            document.documentElement.lang = currentLang.value;
        });
        
        // 监听语言变化更新过滤器标签
        const filters = computed(() => [
            { value: 'all', label: t('statusAll'), icon: 'fas fa-list' },
            { value: 'Pending', label: t('statusPending'), icon: 'fas fa-clock' },
            { value: 'Confirmed', label: t('statusConfirmed'), icon: 'fas fa-check-circle' },
            { value: 'InProgress', label: t('statusInProgress'), icon: 'fas fa-stethoscope' },
            { value: 'Completed', label: t('statusCompleted'), icon: 'fas fa-check-double' },
            { value: 'Cancelled', label: t('statusCancelled'), icon: 'fas fa-times-circle' }
        ]);
        
        // ==================== 状态 ====================
        const isLoggedIn = ref(false);
        const loading = ref(false);
        const currentPage = ref('home');
        const user = ref(null);
        const errorMessage = ref('');
        const unreadCount = ref(0);
        const authMode = ref('login');
        const showLangMenu = ref(false);
        const showConfirm = ref(false);
        const selectedAppointment = ref(null);
        
        const toast = ref({ show: false, message: '', type: 'success', icon: 'fas fa-check-circle' });

        // 表单
        const loginForm = ref({ email: '', password: '' });
        const registerForm = ref({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
        const searchQuery = ref('');
        const appointmentFilter = ref('all');

        // 数据
        const institutions = ref([]);
        const dentists = ref([]);
        const appointments = ref([]);
        const selectedInstitution = ref(null);
        const selectedDentist = ref(null);
        const selectedDate = ref(null);
        const selectedSlot = ref(null);
        const appointmentForm = ref({ symptoms: '', notes: '', needTransportation: false, transportAddress: '', needTranslation: false, translationLanguage: '', servicePhone: '' });
        const editingProfile = ref(false);
        // AI 导诊
        const aiMessages = ref([]);
        const aiInput = ref('');
        const aiSending = ref(false);
        const aiSymptoms = ref([]);
        // 预约页返回目标（默认医生列表，从 AI 导诊进入时返回 AI 导诊）
        const bookingBackPage = ref('dentists');
        const profileForm = ref({ name: '', phone: '', preferredLanguage: 'zh-HK' });
        const timeSlots = ref([]);

        // ==================== 计算属性 ====================
        const filteredInstitutions = computed(() => {
            if (!searchQuery.value) return institutions.value;
            const query = searchQuery.value.toLowerCase();
            return institutions.value.filter(inst => 
                inst.name?.toLowerCase().includes(query) ||
                inst.address?.toLowerCase().includes(query)
            );
        });

        const availableDates = computed(() => {
            const dates = [];
            const today = new Date();
            const dayNames = t('days');
            
            for (let i = 0; i < 14; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() + i);
                const month = date.getMonth() + 1;
                dates.push({
                    value: `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`,
                    dayName: i === 0 ? t('today') : dayNames[date.getDay()],
                    dayNumber: date.getDate(),
                    month: month
                });
            }
            return dates;
        });

        const filteredAppointments = computed(() => {
            if (appointmentFilter.value === 'all') return appointments.value;
            return appointments.value.filter(apt => apt.status === appointmentFilter.value);
        });

        const canSubmit = computed(() => selectedDate.value && selectedSlot.value);

        // ==================== API 方法 ====================
        const getHeaders = () => {
            const token = localStorage.getItem('token');
            return {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            };
        };

        const apiRequest = async (url, options = {}) => {
            console.log('[API Request]', url, options);
            
            // 离线检查
            if (!navigator.onLine) {
                throw new Error(t('networkError'));
            }
            
            // 超时控制
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 15000);
            
            try {
                const response = await fetch(`${API_BASE_URL}${url}`, {
                    ...options,
                    signal: controller.signal,
                    headers: { ...getHeaders(), ...(options.headers || {}) }
                });
                clearTimeout(timeoutId);

                console.log('[API Response]', url, response.status, response.statusText);

                if (response.status === 401) {
                    logout();
                    throw new Error(t('loginExpired'));
                }

                const text = await response.text();
                console.log('[API Response Body]', url, text);
                
                let data = null;
                try {
                    data = text ? JSON.parse(text) : null;
                } catch (e) {
                    console.error('[API Parse Error]', url, e, text);
                    throw new Error('服务器返回格式错误');
                }
                
                if (!response.ok) {
                    throw new Error(data?.message || `${t('error')}: ${response.status}`);
                }
                
                if (!data) {
                    throw new Error('服务器返回为空');
                }
                
                return data;
            } catch (error) {
                clearTimeout(timeoutId);
                if (error.name === 'AbortError') {
                    throw new Error(t('networkError'));
                }
                throw error;
            }
        };

        // ==================== 方法 ====================
        const showToast = (message, type = 'success') => {
            const icons = {
                success: 'fas fa-check-circle',
                error: 'fas fa-exclamation-circle',
                warning: 'fas fa-exclamation-triangle'
            };
            toast.value = { show: true, message, type, icon: icons[type] };
            setTimeout(() => toast.value.show = false, 3000);
        };

        const login = async () => {
            loading.value = true;
            errorMessage.value = '';
            try {
                const data = await apiRequest('/api/auth/login', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: loginForm.value.email,
                        password: loginForm.value.password
                    })
                });
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                user.value = data.user;
                isLoggedIn.value = true;
                showToast(t('loginSuccess'));
                loadInstitutions();
            } catch (error) {
                errorMessage.value = error.message;
            } finally {
                loading.value = false;
            }
        };

        const register = async () => {
            if (registerForm.value.password !== registerForm.value.confirmPassword) {
                errorMessage.value = t('passwordMismatch');
                return;
            }
            if (registerForm.value.password.length < 6) {
                errorMessage.value = t('passwordMinLength');
                return;
            }
            loading.value = true;
            errorMessage.value = '';
            try {
                const data = await apiRequest('/api/auth/register', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: registerForm.value.email,
                        password: registerForm.value.password,
                        name: registerForm.value.name,
                        phone: registerForm.value.phone,
                        preferredLanguage: currentLang.value
                    })
                });
                
                console.log('[Register] Response data:', data);
                
                if (!data || !data.token) {
                    throw new Error('注册失败：服务器未返回有效令牌');
                }
                
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                user.value = data.user;
                isLoggedIn.value = true;
                showToast(t('registerSuccess'));
                loadInstitutions();
            } catch (error) {
                console.error('[Register] Error:', error);
                errorMessage.value = error.message;
            } finally {
                loading.value = false;
            }
        };

        const switchAuthMode = () => {
            authMode.value = authMode.value === 'login' ? 'register' : 'login';
            errorMessage.value = '';
        };

        // ==================== 第三方一键登录（Apple / Google） ====================
        let appleInitialized = false;
        let googleInitialized = false;

        const loadExternalScript = (src) => new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) return resolve();
            const s = document.createElement('script');
            s.src = src;
            s.async = true;
            s.onload = () => resolve();
            s.onerror = () => reject(new Error(t('networkError')));
            document.head.appendChild(s);
        });

        const handleSocialAuthSuccess = (data) => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            user.value = data.user;
            isLoggedIn.value = true;
            showToast(t('loginSuccess'));
            loadInstitutions();
        };

        const loginWithApple = async () => {
            if (!socialAuth.appleEnabled) {
                showToast(t('socialNotAvailable'), 'warning');
                return;
            }
            loading.value = true;
            errorMessage.value = '';
            try {
                await loadExternalScript('https://appleid.cdn.auth0.com/js/appleid/1.0.0/appleid.min.js');
                if (!appleInitialized) {
                    AppleID.auth.init({
                        clientId: SOCIAL_AUTH.appleClientId,
                        redirectURI: SOCIAL_AUTH.appleRedirectURI,
                        responseType: 'code id_token',
                        scope: 'name email',
                        usePopup: true
                    });
                    appleInitialized = true;
                }
                const resp = await AppleID.auth.signIn();
                const identityToken = resp?.authorization?.id_token;
                if (!identityToken) throw new Error(t('error'));
                // 姓名仅首次授权返回，之后由后端占位名代替
                const nameObj = resp?.user?.name;
                const fullName = nameObj ? [nameObj.firstName, nameObj.lastName].filter(Boolean).join(' ') : null;
                const data = await apiRequest('/api/auth/apple', {
                    method: 'POST',
                    body: JSON.stringify({ identityToken, fullName })
                });
                handleSocialAuthSuccess(data);
            } catch (error) {
                // 用户主动关闭弹窗不视为错误
                if (error?.error !== 'popup_closed_by_user') {
                    errorMessage.value = error.message || error?.error || t('error');
                }
            } finally {
                loading.value = false;
            }
        };

        const loginWithGoogle = async () => {
            if (!socialAuth.googleEnabled) {
                showToast(t('socialNotAvailable'), 'warning');
                return;
            }
            loading.value = true;
            errorMessage.value = '';
            try {
                await loadExternalScript('https://accounts.google.com/gsi/client');
                if (!googleInitialized) {
                    google.accounts.id.initialize({
                        client_id: SOCIAL_AUTH.googleClientId,
                        callback: async (response) => {
                            // response.credential 即 ID token，交由后端验证
                            try {
                                const data = await apiRequest('/api/auth/google', {
                                    method: 'POST',
                                    body: JSON.stringify({ idToken: response.credential })
                                });
                                handleSocialAuthSuccess(data);
                            } catch (err) {
                                errorMessage.value = err.message;
                            }
                        }
                    });
                    googleInitialized = true;
                }
                google.accounts.id.prompt();
            } catch (error) {
                errorMessage.value = error.message || t('error');
            } finally {
                loading.value = false;
            }
        };

        const logout = () => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            isLoggedIn.value = false;
            user.value = null;
            currentPage.value = 'home';
            showToast(t('logoutSuccess'));
        };

        const loadInstitutions = async () => {
            try {
                const data = await apiRequest('/api/institutions');
                institutions.value = data.items || data || [];
            } catch (error) {
                console.error('[Load Institutions] Error:', error);
                showToast(error.message || t('networkError'), 'error');
                institutions.value = [];
            }
        };

        const selectInstitution = async (inst) => {
            selectedInstitution.value = inst;
            bookingBackPage.value = 'dentists';
            currentPage.value = 'dentists';
            try {
                const data = await apiRequest(`/api/institutions/${inst.id}/dentists`);
                dentists.value = data.items || data || [];
            } catch (error) {
                console.error('[Select Institution] Error:', error);
                showToast(error.message || t('networkError'), 'error');
                dentists.value = [];
            }
        };

        const selectDentist = async (dentist) => {
            selectedDentist.value = dentist;
            selectedDate.value = availableDates.value[0]?.value || null;
            selectedSlot.value = null;
            appointmentForm.value = { symptoms: '', notes: '', needTransportation: false, transportAddress: '', needTranslation: false, translationLanguage: '', servicePhone: '' };
            currentPage.value = 'booking';
            if (selectedDate.value) await loadTimeSlots();
        };

        const selectDate = async (date) => {
            selectedDate.value = date;
            selectedSlot.value = null;
            await loadTimeSlots();
        };

        const loadTimeSlots = async () => {
            if (!selectedDentist.value || !selectedDate.value) return;
            try {
                const data = await apiRequest(`/api/institutions/dentists/${selectedDentist.value.id}/slots?date=${selectedDate.value}`);
                timeSlots.value = data || [];
            } catch (error) {
                console.error('[Load TimeSlots] Error:', error);
                showToast(error.message || t('networkError'), 'error');
                timeSlots.value = [];
            }
        };

        // 预约确认弹窗相关方法
        const showConfirmModal = () => {
            if (!canSubmit.value) return;
            showConfirm.value = true;
        };

        const closeConfirmModal = () => {
            showConfirm.value = false;
        };

        const confirmCreateAppointment = async () => {
            await createAppointment();
            showConfirm.value = false;
        };

        const formatConfirmDate = (dateStr) => {
            if (!dateStr) return '';
            const [y, m, d] = dateStr.split('-').map(Number);
            const date = new Date(y, m - 1, d);
            const dayNames = t('days');
            const dayName = dayNames[date.getDay()];
            return `${date.getMonth() + 1}/${date.getDate()} (${dayName})`;
        };

        // 预约详情相关方法
        const showAppointmentDetail = (appointment) => {
            selectedAppointment.value = appointment;
        };

        const closeAppointmentDetail = () => {
            selectedAppointment.value = null;
        };

        const cancelDetailAppointment = async () => {
            if (!selectedAppointment.value) return;
            await cancelAppointment(selectedAppointment.value.apptId);
            selectedAppointment.value = null;
        };

        const formatDateTime = (dateTimeStr) => {
            if (!dateTimeStr) return '';
            const date = new Date(dateTimeStr);
            if (currentLang.value === 'en') {
                return date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
            } else if (currentLang.value === 'ar') {
                return date.toLocaleString('ar-SA', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
            }
            return `${date.getMonth() + 1}/${date.getDate()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
        };

        // 获取语言名称
        const getLanguageName = (langCode) => {
            const languages = {
                'en': 'English (英语)',
                'zh-CN': '简体中文',
                'zh-HK': '繁體中文',
                'ar': 'العربية (阿拉伯语)',
                'ja': '日本語',
                'ko': '한국어',
                'fr': 'Français',
                'es': 'Español',
                'other': t('other')
            };
            return languages[langCode] || langCode;
        };

        const createAppointment = async () => {
            if (!canSubmit.value) return;
            loading.value = true;
            try {
                await apiRequest('/api/appointments', {
                    method: 'POST',
                    body: JSON.stringify({
                        instId: selectedInstitution.value.id,
                        dentistId: selectedDentist.value.id,
                        apptDate: selectedDate.value,
                        apptTime: selectedSlot.value,
                        userRemarks: appointmentForm.value.symptoms + (appointmentForm.value.notes ? '\n' + appointmentForm.value.notes : ''),
                        needTransportation: appointmentForm.value.needTransportation,
                        transportAddress: appointmentForm.value.transportAddress,
                        transportPhone: appointmentForm.value.needTransportation ? appointmentForm.value.servicePhone : null,
                        needTranslation: appointmentForm.value.needTranslation,
                        translationLanguage: appointmentForm.value.translationLanguage,
                        translationPhone: appointmentForm.value.needTranslation ? appointmentForm.value.servicePhone : null
                    })
                });
                showToast(t('bookingSuccess'));
                currentPage.value = 'appointments';
                loadAppointments();
            } catch (error) {
                showToast(error.message, 'error');
            } finally {
                loading.value = false;
            }
        };

        const loadAppointments = async () => {
            try {
                const data = await apiRequest('/api/appointments/my');
                appointments.value = data.items || data || [];
            } catch (error) {
                console.error('[Load Appointments] Error:', error);
                showToast(error.message || t('networkError'), 'error');
                appointments.value = [];
            }
        };

        const cancelAppointment = async (apptId) => {
            if (!confirm(t('cancelConfirm'))) return;
            try {
                await apiRequest(`/api/appointments/${apptId}/cancel`, {
                    method: 'POST',
                    body: JSON.stringify({ cancelReason: 'User cancelled' })
                });
                showToast(t('cancelSuccess'));
                loadAppointments();
            } catch (error) {
                showToast(error.message, 'error');
            }
        };

        const getStatusLabel = (status) => {
            const labels = {
                'Pending': t('statusPending'),
                'Confirmed': t('statusConfirmed'),
                'InProgress': t('statusInProgress'),
                'Completed': t('statusCompleted'),
                'Cancelled': t('statusCancelled')
            };
            return labels[status] || status;
        };

        const getStatusClass = (status) => {
            const classes = {
                'Pending': 'pending',
                'Confirmed': 'confirmed',
                'InProgress': 'in-treatment',
                'Completed': 'completed',
                'Cancelled': 'cancelled'
            };
            return classes[status] || '';
        };

        const getStatusIcon = (status) => {
            const icons = {
                'Pending': 'fas fa-clock',
                'Confirmed': 'fas fa-check-circle',
                'InProgress': 'fas fa-stethoscope',
                'Completed': 'fas fa-check-double',
                'Cancelled': 'fas fa-times-circle'
            };
            return icons[status] || 'fas fa-question-circle';
        };

        const getFilterLabel = () => {
            const filter = filters.value.find(f => f.value === appointmentFilter.value);
            return filter ? filter.label : '';
        };

        const formatDate = (dateStr) => {
            if (!dateStr) return '';
            // 兼容 "YYYY-MM-DD" 和 ISO DateTime（如 "2026-08-01T00:00:00"），按本地日期解析避免时区偏移
            const m = String(dateStr).match(/^(\d{4})-(\d{2})-(\d{2})/);
            if (!m) return '';
            const date = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
            if (currentLang.value === 'en') {
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            } else if (currentLang.value === 'ar') {
                return date.toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' });
            }
            return `${date.getMonth() + 1}月${date.getDate()}日`;
        };

        const formatTime = (timeStr) => {
            if (!timeStr) return '';
            return timeStr.substring(0, 5);
        };

        const startEditProfile = () => {
            profileForm.value = {
                name: user.value?.name || '',
                phone: user.value?.phone || '',
                preferredLanguage: user.value?.preferredLanguage || currentLang.value
            };
            editingProfile.value = true;
        };

        const saveProfile = async () => {
            loading.value = true;
            try {
                const data = await apiRequest('/api/auth/profile', {
                    method: 'PUT',
                    body: JSON.stringify(profileForm.value)
                });
                user.value = { ...user.value, ...data };
                localStorage.setItem('user', JSON.stringify(user.value));
                editingProfile.value = false;
                showToast(t('saveSuccess'));
            } catch (error) {
                showToast(error.message, 'error');
            } finally {
                loading.value = false;
            }
        };

        const cancelEditProfile = () => { editingProfile.value = false; };

        const showNotifications = () => { showToast(t('noNotifications'), 'warning'); };
        const showSettings = () => { showToast(t('settings') + ' - ' + t('comingSoon'), 'warning'); };
        const showHelp = () => { showToast(t('help') + ' - ' + t('comingSoon'), 'warning'); };

        // ==================== AI 导诊 ====================
        const openAiConsult = () => {
            currentPage.value = 'ai-consult';
            if (aiMessages.value.length === 0) {
                aiMessages.value = [{ role: 'assistant', text: t('aiWelcome'), isWelcome: true }];
                loadAiSymptoms();
            }
        };

        const loadAiSymptoms = async () => {
            try {
                const list = await apiRequest('/api/search/symptoms');
                aiSymptoms.value = (Array.isArray(list) ? list : []).slice(0, 8);
            } catch (e) {
                // 快捷症状加载失败不影响使用
                aiSymptoms.value = [];
            }
        };

        const scrollAiToBottom = () => {
            nextTick(() => {
                window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
            });
        };

        const sendAiMessage = async (presetText) => {
            if (aiSending.value) return;
            const text = (typeof presetText === 'string' ? presetText : aiInput.value).trim();
            if (text.length < 2) {
                showToast(t('aiSymptomTooShort'), 'warning');
                return;
            }

            // 多轮对话：带上最近的聊天记录（跳过欢迎语/思考中占位，不含本条，最多 8 条）
            const history = aiMessages.value
                .filter(m => (m.role === 'user' || m.role === 'assistant') && m.text && !m.thinking && !m.isWelcome)
                .slice(-8)
                .map(m => ({ role: m.role, content: String(m.text).slice(0, 500) }));

            aiMessages.value.push({ role: 'user', text });
            aiMessages.value.push({ role: 'assistant', thinking: true });
            aiInput.value = '';
            aiSending.value = true;
            scrollAiToBottom();

            try {
                const res = await apiRequest('/api/ai/triage', {
                    method: 'POST',
                    body: JSON.stringify({ symptoms: text, history })
                });
                const reply = {
                    role: 'assistant',
                    text: res.advice || '',
                    specialties: res.suggestedSpecialties || [],
                    dentists: res.dentists || [],
                    disclaimer: res.disclaimer || '',
                    source: res.source || ''
                };
                aiMessages.value.splice(aiMessages.value.length - 1, 1, reply);
            } catch (error) {
                console.error('[AI Triage] Error:', error);
                aiMessages.value.splice(aiMessages.value.length - 1, 1, {
                    role: 'assistant',
                    text: t('aiErrorReply'),
                    isError: true
                });
            } finally {
                aiSending.value = false;
                scrollAiToBottom();
            }
        };

        // 点击推荐医生卡片：拉取医生详情后进入预约页（PWA 现有医生详情/预约流程）
        const goToAiDentist = async (d) => {
            if (!d || !d.id) return;
            loading.value = true;
            try {
                const detail = await apiRequest(`/api/institutions/dentists/${d.id}`);
                const instId = detail.instId ?? detail.InstId;
                if (!instId) throw new Error(t('error'));
                selectedInstitution.value = { id: instId, name: d.institutionName || '' };
                bookingBackPage.value = 'ai-consult';
                await selectDentist({
                    id: d.id,
                    name: d.name,
                    title: d.title,
                    specialties: Array.isArray(detail.specialties) ? detail.specialties.join('、') : (detail.specialties || d.specialties || ''),
                    introduction: detail.introduction || '',
                    rating: d.rating ?? detail.rating ?? 0,
                    reviewCount: d.reviewCount ?? detail.reviewCount ?? 0,
                    consultPrice: detail.consultPrices?.[0]?.price
                });
            } catch (error) {
                console.error('[AI Triage] GoToDentist Error:', error);
                showToast(error.message || t('networkError'), 'error');
            } finally {
                loading.value = false;
            }
        };

        // ==================== 生命周期 ====================
        onMounted(async () => {
            const token = localStorage.getItem('token');
            const savedUser = localStorage.getItem('user');
            if (token && savedUser) {
                try {
                    const parsedUser = JSON.parse(savedUser);
                    // 检查用户角色，非患者角色无法访问患者端
                    // 支持字符串 'Patient' 和数字 0 两种格式
                    const userType = parsedUser.userType;
                    const isPatient = userType === 'Patient' || userType === 0 || userType === '0';
                    
                    if (!isPatient) {
                        // 非患者角色，清空登录状态
                        console.log('[Patient Portal] 检测到非患者角色:', userType, '执行登出');
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        showToast('请使用患者账号登录', 'warning');
                        return;
                    }
                    
                    // 验证 token 是否有效（向后端发起一个轻量请求）
                    const verifyResponse = await fetch(`${API_BASE_URL}/api/institutions`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    
                    if (verifyResponse.status === 401) {
                        // token 已过期或无效，清除登录状态
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        showToast('登录已过期，请重新登录', 'error');
                        return;
                    }
                    
                    if (verifyResponse.ok) {
                        user.value = parsedUser;
                        isLoggedIn.value = true;
                        loadInstitutions();
                    }
                } catch (e) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }
            }
            
            // 点击外部关闭语言菜单
            document.addEventListener('click', (e) => {
                const langDropdown = e.target.closest('.lang-selector-float, .lang-dropdown-header');
                if (!langDropdown) {
                    showLangMenu.value = false;
                }
            });
            
            // 页面可见性变化时检查用户角色（防止切换标签页后角色错误）
            document.addEventListener('visibilitychange', () => {
                if (!document.hidden && isLoggedIn.value) {
                    const savedUser = localStorage.getItem('user');
                    if (savedUser) {
                        try {
                            const parsedUser = JSON.parse(savedUser);
                            const userType = parsedUser.userType;
                            const isPatient = userType === 'Patient' || userType === 0 || userType === '0';
                            
                            if (!isPatient) {
                                // 非患者角色，强制登出
                                console.log('[Patient Portal] 可见性检测到非患者角色:', userType);
                                localStorage.removeItem('token');
                                localStorage.removeItem('user');
                                isLoggedIn.value = false;
                                user.value = null;
                                showToast('身份已过期，请使用患者账号重新登录', 'warning');
                            }
                        } catch (e) {
                            // 忽略解析错误
                        }
                    }
                }
            });
        });

        // ==================== 返回 ====================
        return {
            // 语言
            currentLang, isRtl, t, changeLanguage, showLangMenu, getLangInfo,
            // 状态
            isLoggedIn, loading, currentPage, user, errorMessage, toast, unreadCount,
            authMode, editingProfile, showConfirm, selectedAppointment,
            // 表单
            loginForm, registerForm, appointmentForm, profileForm,
            // 搜索筛选
            searchQuery, appointmentFilter, filters,
            // 数据
            institutions, dentists, appointments, selectedInstitution,
            selectedDentist, selectedDate, selectedSlot, timeSlots,
            // 计算属性
            filteredInstitutions, availableDates, filteredAppointments, canSubmit,
            // 方法
            login, register, switchAuthMode, logout,
            // 第三方一键登录
            socialAuth, loginWithApple, loginWithGoogle,
            selectInstitution, selectDentist, selectDate, loadTimeSlots,
            createAppointment, loadAppointments, cancelAppointment,
            getStatusLabel, getStatusClass, getStatusIcon, getFilterLabel,
            formatDate, formatTime, startEditProfile, saveProfile, cancelEditProfile,
            showNotifications, showSettings, showHelp,
            // AI 导诊
            aiMessages, aiInput, aiSending, aiSymptoms, bookingBackPage,
            openAiConsult, sendAiMessage, goToAiDentist,
            // 确认弹窗
            showConfirmModal, closeConfirmModal, confirmCreateAppointment, formatConfirmDate,
            showAppointmentDetail, closeAppointmentDetail, cancelDetailAppointment, formatDateTime,
            // 语言
            getLanguageName
        };
    }
});

window.app = app.mount('#app');
