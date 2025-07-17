// Улучшенный прелоадер
let pageLoaded = false;

function hidePreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }
}

window.addEventListener('load', function() {
  pageLoaded = true;
  setTimeout(hidePreloader, 500);
  
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    setTimeout(() => {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    }, 100 * index);
  });
});

setTimeout(() => {
  if (!pageLoaded) hidePreloader();
}, 3000);

// Звуковые эффекты
function playSound(id) {
  const sound = document.getElementById(id);
  if (sound) {
    sound.currentTime = 0;
    sound.play().catch(e => console.log("Sound play prevented:", e));
  }
}

// Чат
let chatVisible = false;
let terminalVisible = false;
let currentLang = 'ru';
let terminalUnlocked = false;
const TERMINAL_PASSWORD = "humo2025";

function toggleChat() {
  const chatBox = document.getElementById('chatBox');
  chatVisible = !chatVisible;
  
  if (chatVisible) {
    chatBox.classList.add('visible');
    document.getElementById('userInput').focus();
    playSound('sound-chat');
  } else {
    chatBox.classList.remove('visible');
  }
}

// Мультиязычная база знаний
const multilingualContent = {
  ru: {
    // Навигация
    "nav-inv": "Изобретения",
    "nav-team": "Команда",
    "nav-about": "О компании",
    "nav-contacts": "Контакты",
    "nav-solar": "Солнечная станция S1",
    
    // О компании
    "title-about": "О компании",
    "about-text": "Humo Corporation занимается разработкой инновационных технологий в области спасения, автономной энергетики и умных систем.",
    
    // Изобретения
    "title-inv": "Изобретения",
    "drone-title": "Спасательный дрон Q1",
    "drone-subtitle": "Инновационное решение для экстренной помощи в условиях стихийных бедствий",
    "feature1-title": "🔍 Автоматический разведывательный полёт",
    "feature1-text": "После стихийного бедствия Q1 автоматически вылетает с базы. Каждому дрону назначена собственная зона поиска.",
    "feature1-item1": "Основной зум-камера",
    "feature1-item2": "Тепловизор",
    "feature1-item3": "AI-аналитика видео",
    "feature2-title": "🤖 Искусственный интеллект",
    "feature2-text": "При обнаружении объектов, похожих на человека:",
    "feature2-item1": "Определение по видео (от 40%)",
    "feature2-item2": "Подтверждение тепловизором (до 80%)",
    "feature2-item3": "Фиксация местоположения",
    "feature3-title": "🚨 Экстренная помощь",
    "feature3-text": "При обнаружении пострадавшего:",
    "feature3-item1": "Сброс аптечки и радиостанции",
    "feature3-item2": "Передача сигнала SOS",
    "feature3-item3": "Запуск сигнальных ракет",
    "feature4-title": "🧠 Психологическая поддержка",
    "feature4-text": "Встроенные микрофон и динамик позволяют:",
    "feature4-item1": "Общение с оператором",
    "feature4-item2": "Успокоение в шоковом состоянии",
    "feature4-item3": "Инструкции до прибытия помощи",
    "spec1-name": "Полётное время:",
    "spec1-value": "до 1 часа 20 минут",
    "spec2-name": "Рабочий цикл:",
    "spec2-value": "50 мин полёта + возврат",
    "spec3-name": "Полезная нагрузка:",
    "spec3-value": "до 7 кг",
    "spec4-name": "Максимальный вес:",
    "spec4-value": "до 18 кг",
    "spec5-name": "Модули связи:",
    "spec5-value": "GPS, радиоканал, сигнализация",
    "spec6-name": "Сигнальные ракеты:",
    "spec6-value": "3 на дрон",
    "benefit1": "Дешевле и масштабируемее, чем использование вертолётов",
    "benefit2": "Может работать в труднодоступных зонах",
    "benefit3": "Групповое использование: от 10 до 20 дронов можно развернуть одновременно",
    "benefit4": "Быстрая реакция на бедствие -- первая волна помощи за считаные минуты",
    "photo-btn": "📸 ФОТО-АРХИВ",
    "video-btn": "🎥 ВИДЕО-АРХИВ",
    
    // Солнечная станция
    "title-solar": "☀️ Умная солнечная электростанция S1",
    "solar-subtitle": "[[ Протокол 'Фотон' активирован ]]",
    "solar-feature1": "🧠 ИИ 'Helios'",
    "solar-item1": "Точное отслеживание солнца (0.1°)",
    "solar-item2": "Автозащита при непогоде",
    "solar-item3": "Прогноз выработки на 72ч",
    "solar-feature2": "⚡ Автономность",
    "solar-item4": "5 кВт/ч пиковой мощности",
    "solar-item5": "Аккумуляторы 10 кВт·ч",
    "solar-item6": "Работа при -40°C...+60°C",
    "solar-spec1": "Габариты:",
    "solar-spec1-value": "2×1×1 м",
    "solar-spec2": "Панели:",
    "solar-spec2-value": "8 × 250W",
    "solar-spec3": "Вес:",
    "solar-spec3-value": "120 кг",
    "solar-protocol-title": "▸ Режимы работы:",
    "solar-mode-day": "🌞 Дневной:",
    "solar-mode-day1": "Автоповорот панелей",
    "solar-mode-day2": "Максимальный КПД",
    "solar-mode-night": "🌙 Ночной:",
    "solar-mode-night1": "Складывание панелей",
    "solar-mode-night2": "Энергосбережение",
    "solar-photo-btn": "☀️ ФОТО-АРХИВ",
    "solar-video-btn": "⚡ ВИДЕО-АРХИВ",
    
    // Команда
    "title-team": "Команда",
    "text-team": "Генеральный директор и генеральный инженер-изобретатель: <strong>Jurabek Kayumov</strong>",
    
    // Контакты
    "title-contacts": "Контакты",
    "text-contacts": "Электронная почта: <strong>jqayumov430@gmail.com</strong><br>Телефон: <strong>+7 950 224-20-42</strong>",
    
    // Чат
    "chat-greeting": "Добро пожаловать в Humo Corporation. Я защищаю этот сайт и готова помочь вам.",
    
    // Футер
    "footer-text": "© 2025 Humo Corporation. Все права защищены."
  },
  en: {
    // Navigation
    "nav-inv": "Inventions",
    "nav-team": "Team",
    "nav-about": "About",
    "nav-contacts": "Contacts",
    "nav-solar": "Solar Station S1",
    
    // About
    "title-about": "About Us",
    "about-text": "Humo Corporation develops innovative technologies in rescue systems, autonomous energy, and smart systems.",
    
    // Inventions
    "title-inv": "Inventions",
    "drone-title": "Rescue Drone Q1",
    "drone-subtitle": "Innovative solution for emergency response in disaster conditions",
    "feature1-title": "🔍 Autonomous Reconnaissance Flight",
    "feature1-text": "After a natural disaster, Q1 automatically launches from base. Each drone is assigned its own search area.",
    "feature1-item1": "Main zoom camera",
    "feature1-item2": "Thermal imaging",
    "feature1-item3": "AI video analytics",
    "feature2-title": "🤖 Artificial Intelligence",
    "feature2-text": "When detecting human-like objects:",
    "feature2-item1": "Video identification (from 40%)",
    "feature2-item2": "Thermal confirmation (up to 80%)",
    "feature2-item3": "Location fixation",
    "feature3-title": "🚨 Emergency Assistance",
    "feature3-text": "When a victim is detected:",
    "feature3-item1": "Drops first aid kit and radio",
    "feature3-item2": "Transmits SOS signal",
    "feature3-item3": "Launches signal flares",
    "feature4-title": "🧠 Psychological Support",
    "feature4-text": "Built-in microphone and speaker allow:",
    "feature4-item1": "Communication with operator",
    "feature4-item2": "Calming in shock state",
    "feature4-item3": "Instructions until help arrives",
    "spec1-name": "Flight time:",
    "spec1-value": "up to 1 hour 20 minutes",
    "spec2-name": "Operational cycle:",
    "spec2-value": "50 min flight + return",
    "spec3-name": "Payload:",
    "spec3-value": "up to 7 kg",
    "spec4-name": "Max weight:",
    "spec4-value": "up to 18 kg",
    "spec5-name": "Communication modules:",
    "spec5-value": "GPS, radio, alarm",
    "spec6-name": "Signal flares:",
    "spec6-value": "3 per drone",
    "benefit1": "Cheaper and more scalable than using helicopters",
    "benefit2": "Can operate in hard-to-reach areas",
    "benefit3": "Group use: 10 to 20 drones can be deployed simultaneously",
    "benefit4": "Fast disaster response - first wave of aid in minutes",
    "photo-btn": "📸 PHOTO ARCHIVE",
    "video-btn": "🎥 VIDEO ARCHIVE",
    
    // Solar Station
    "title-solar": "☀️ Smart Solar Station S1",
    "solar-subtitle": "[[ Protocol 'Photon' activated ]]",
    "solar-feature1": "🧠 AI 'Helios'",
    "solar-item1": "Precise sun tracking (0.1°)",
    "solar-item2": "Auto-protection in bad weather",
    "solar-item3": "72h energy forecast",
    "solar-feature2": "⚡ Self-sufficiency",
    "solar-item4": "5 kW/h peak power",
    "solar-item5": "10 kW·h batteries",
    "solar-item6": "Operates at -40°C...+60°C",
    "solar-spec1": "Dimensions:",
    "solar-spec1-value": "2×1×1 m",
    "solar-spec2": "Panels:",
    "solar-spec2-value": "8 × 250W",
    "solar-spec3": "Weight:",
    "solar-spec3-value": "120 kg",
    "solar-protocol-title": "▸ Operation modes:",
    "solar-mode-day": "🌞 Day:",
    "solar-mode-day1": "Auto panel rotation",
    "solar-mode-day2": "Maximum efficiency",
    "solar-mode-night": "🌙 Night:",
    "solar-mode-night1": "Panel folding",
    "solar-mode-night2": "Power saving",
    "solar-photo-btn": "☀️ PHOTO ARCHIVE",
    "solar-video-btn": "⚡ VIDEO ARCHIVE",
    
    // Team
    "title-team": "Team",
    "text-team": "CEO and Chief Engineer-Inventor: <strong>Jurabek Kayumov</strong>",
    
    // Contacts
    "title-contacts": "Contacts",
    "text-contacts": "Email: <strong>jqayumov430@gmail.com</strong><br>Phone: <strong>+7 950 224-20-42</strong>",
    
    // Chat
    "chat-greeting": "Welcome to Humo Corporation. I protect this site and am ready to assist you.",
    
    // Footer
    "footer-text": "© 2025 Humo Corporation. All rights reserved."
  },
  zh: {
    // Navigation
    "nav-inv": "发明",
    "nav-team": "团队",
    "nav-about": "关于我们",
    "nav-contacts": "联系方式",
    "nav-solar": "太阳能站 S1",
    
    // About
    "title-about": "关于我们",
    "about-text": "Humo Corporation 致力于开发救援系统、自主能源和智能系统方面的创新技术。",
    
    // Inventions
    "title-inv": "发明",
    "drone-title": "救援无人机 Q1",
    "drone-subtitle": "自然灾害条件下紧急救援的创新解决方案",
    "feature1-title": "🔍 自动侦察飞行",
    "feature1-text": "自然灾害发生后，Q1自动从基地起飞。每架无人机分配有自己的搜索区域。",
    "feature1-item1": "主变焦摄像头",
    "feature1-item2": "热成像仪",
    "feature1-item3": "AI视频分析",
    "feature2-title": "🤖 人工智能",
    "feature2-text": "检测到类似人类的物体时:",
    "feature2-item1": "视频识别(40%起)",
    "feature2-item2": "热成像确认(达80%)",
    "feature2-item3": "位置固定",
    "feature3-title": "🚨 紧急援助",
    "feature3-text": "发现受害者时:",
    "feature3-item1": "投放急救包和无线电",
    "feature3-item2": "发送SOS信号",
    "feature3-item3": "发射信号弹",
    "feature4-title": "🧠 心理支持",
    "feature4-text": "内置麦克风和扬声器可实现:",
    "feature4-item1": "与操作员沟通",
    "feature4-item2": "安抚休克状态",
    "feature4-item3": "救援到达前的指导",
    "spec1-name": "飞行时间:",
    "spec1-value": "最长1小时20分钟",
    "spec2-name": "工作周期:",
    "spec2-value": "50分钟飞行+返回",
    "spec3-name": "有效载荷:",
    "spec3-value": "最多7公斤",
    "spec4-name": "最大重量:",
    "spec4-value": "最多18公斤",
    "spec5-name": "通信模块:",
    "spec5-value": "GPS, 无线电, 警报",
    "spec6-name": "信号弹:",
    "spec6-value": "每架3枚",
    "benefit1": "比使用直升机更经济且可扩展",
    "benefit2": "可在难以到达的区域工作",
    "benefit3": "群体使用：可同时部署10至20架无人机",
    "benefit4": "快速灾害响应 - 几分钟内提供第一波援助",
    "photo-btn": "📸 照片档案",
    "video-btn": "🎥 视频档案",
    
    // Solar Station
    "title-solar": "☀️ 智能太阳能站 S1",
    "solar-subtitle": "[[ 协议'光子'已激活 ]]",
    "solar-feature1": "🧠 人工智能'Helios'",
    "solar-item1": "精确太阳跟踪 (0.1°)",
    "solar-item2": "恶劣天气自动保护",
    "solar-item3": "72小时能源预测",
    "solar-feature2": "⚡ 自给自足",
    "solar-item4": "5 千瓦/小时峰值",
    "solar-item5": "10 千瓦·时电池",
    "solar-item6": "工作温度 -40°C...+60°C",
    "solar-spec1": "尺寸:",
    "solar-spec1-value": "2×1×1 米",
    "solar-spec2": "面板:",
    "solar-spec2-value": "8 × 250W",
    "solar-spec3": "重量:",
    "solar-spec3-value": "120 公斤",
    "solar-protocol-title": "▸ 工作模式:",
    "solar-mode-day": "🌞 白天:",
    "solar-mode-day1": "自动面板旋转",
    "solar-mode-day2": "最大效率",
    "solar-mode-night": "🌙 夜间:",
    "solar-mode-night1": "面板折叠",
    "solar-mode-night2": "节能模式",
    "solar-photo-btn": "☀️ 照片档案",
    "solar-video-btn": "⚡ 视频档案",
    
    // Team
    "title-team": "团队",
    "text-team": "首席执行官兼总工程师发明家: <strong>Jurabek Kayumov</strong>",
    
    // Contacts
    "title-contacts": "联系方式",
    "text-contacts": "电子邮件: <strong>jqayumov430@gmail.com</strong><br>电话: <strong>+7 950 224-20-42</strong>",
    
    // Chat
    "chat-greeting": "欢迎来到 Humo Corporation。我负责保护此网站并随时为您提供帮助。",
    
    // Footer
    "footer-text": "© 2025 Humo Corporation。保留所有权利。"
  },
  ja: {
    // Navigation
    "nav-inv": "発明",
    "nav-team": "チーム",
    "nav-about": "会社概要",
    "nav-contacts": "連絡先",
    "nav-solar": "ソーラーステーション S1",
    
    // About
    "title-about": "会社概要",
    "about-text": "Humo Corporationは、救助、自立型エネルギー、スマートシステムの革新的な技術を開発しています。",
    
    // Inventions
    "title-inv": "発明",
    "drone-title": "救助ドローン Q1",
    "drone-subtitle": "自然災害時の緊急対応のための革新的なソリューション",
    "feature1-title": "🔍 自動偵察飛行",
    "feature1-text": "自然災害発生後、Q1は自動的に基地から離陸します。各ドローンには独自の検索区域が割り当てられます。",
    "feature1-item1": "メインズームカメラ",
    "feature1-item2": "サーマルイメージング",
    "feature1-item3": "AIビデオ分析",
    "feature2-title": "🤖 人工知能",
    "feature2-text": "人間のような物体を検出した場合:",
    "feature2-item1": "映像識別(40%以上)",
    "feature2-item2": "熱画像確認(80%まで)",
    "feature2-item3": "位置情報固定",
    "feature3-title": "🚨 緊急援助",
    "feature3-text": "被災者を発見した場合:",
    "feature3-item1": "救急キットと無線機を投下",
    "feature3-item2": "SOS信号を送信",
    "feature3-item3": "信号弾を発射",
    "feature4-title": "🧠 心理的サポート",
    "feature4-text": "内蔵マイクとスピーカーにより:",
    "feature4-item1": "オペレーターとの通信",
    "feature4-item2": "ショック状態の鎮静",
    "feature4-item3": "救助到着までの指示",
    "spec1-name": "飛行時間:",
    "spec1-value": "最大1時間20分",
    "spec2-name": "作業サイクル:",
    "spec2-value": "50分飛行+帰還",
    "spec3-name": "ペイロード:",
    "spec3-value": "最大7kg",
    "spec4-name": "最大重量:",
    "spec4-value": "最大18kg",
    "spec5-name": "通信モジュール:",
    "spec5-value": "GPS, 無線, 警報",
    "spec6-name": "信号弾:",
    "spec6-value": "ドローンあたり3発",
    "benefit1": "ヘリコプターよりも安価で拡張可能",
    "benefit2": "アクセス困難な地域でも作動可能",
    "benefit3": "グループ使用：10～20機のドローンを同時展開可能",
    "benefit4": "災害への迅速な対応 - 数分で第一波の援助",
    "photo-btn": "📸 写真アーカイブ",
    "video-btn": "🎥 ビデオアーカイブ",
    
    // Solar Station
    "title-solar": "☀️ スマートソーラーステーション S1",
    "solar-subtitle": "[[ プロトコル「フォトン」有効化 ]]",
    "solar-feature1": "🧠 AI「Helios」",
    "solar-item1": "精密太陽追跡 (0.1°)",
    "solar-item2": "悪天候自動保護",
    "solar-item3": "72時間エネルギー予測",
    "solar-feature2": "⚡ 自己完結型",
    "solar-item4": "5 kW/h ピーク出力",
    "solar-item5": "10 kW·h バッテリー",
    "solar-item6": "作動温度 -40°C...+60°C",
    "solar-spec1": "寸法:",
    "solar-spec1-value": "2×1×1 m",
    "solar-spec2": "パネル:",
    "solar-spec2-value": "8 × 250W",
    "solar-spec3": "重量:",
    "solar-spec3-value": "120 kg",
    "solar-protocol-title": "▸ 動作モード:",
    "solar-mode-day": "🌞 昼間:",
    "solar-mode-day1": "自動パネル調整",
    "solar-mode-day2": "最大効率",
    "solar-mode-night": "🌙 夜間:",
    "solar-mode-night1": "パネル折畳み",
    "solar-mode-night2": "省エネモード",
    "solar-photo-btn": "☀️ 写真アーカイブ",
    "solar-video-btn": "⚡ ビデオアーカイブ",
    
    // Team
    "title-team": "チーム",
    "text-team": "CEOおよび主任技術者・発明者: <strong>Jurabek Kayumov</strong>",
    
    // Contacts
    "title-contacts": "連絡先",
    "text-contacts": "Eメール: <strong>jqayumov430@gmail.com</strong><br>電話: <strong>+7 950 224-20-42</strong>",
    
    // Chat
    "chat-greeting": "Humo Corporationへようこそ。私はこのサイトを守り、あなたをサポートします。",
    
    // Footer
    "footer-text": "© 2025 Humo Corporation。無断複写・転載を禁じます。"
  }
};

// Функция смены языка
function switchLanguage(lang) {
  currentLang = lang;
  
  document.querySelectorAll('.language-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  
  for (const [key, value] of Object.entries(multilingualContent[lang])) {
    const elements = document.querySelectorAll(`[id="${key}"]`);
    elements.forEach(el => {
      if (el) el.innerHTML = value;
    });
  }
  
  updateAIGreeting();
  
  const terminalInput = document.getElementById('terminalCommand');
  if (terminalInput) {
    if (terminalUnlocked) {
      terminalInput.placeholder = {
        ru: 'Введите команду...',
        en: 'Enter command...',
        zh: '输入命令...',
        ja: 'コマンドを入力...'
      }[currentLang];
    } else {
      terminalInput.placeholder = {
        ru: 'Введите код доступа...',
        en: 'Enter access code...',
        zh: '输入访问代码...',
        ja: 'アクセスコードを入力...'
      }[currentLang];
    }
  }
}

function updateAIGreeting() {
  const chatGreeting = document.getElementById('chat-greeting');
  if (chatGreeting) {
    chatGreeting.textContent = multilingualContent[currentLang]["chat-greeting"];
  }
}

const RedQueenAI = {
  threats: ["hack", "attack", "virus", "malware", "breach", "взлом", "атака", "вирус", "密码", "侵入"],
  greetings: {
    ru: ["Добро пожаловать в систему", "Red Queen на связи", "Все протоколы активны"],
    en: ["System operational", "Red Queen online", "Security protocols engaged"],
    zh: ["系统已启动", "红后在线", "安全协议激活"],
    ja: ["システム作動中", "レッドクイーンが起動しました", "セキュリティプロトコル有効"]
  },
  warnings: {
    ru: [
      "Обнаружено вторжение. Активирую защиту.",
      "Доступ запрещен. Уровень угрозы повышен.",
      "Предупреждение: ваши действия записаны."
    ],
    en: [
      "Intrusion detected. Activating defenses.",
      "Access denied. Threat level elevated.",
      "Warning: your actions are being logged."
    ],
    zh: [
      "检测到入侵。正在激活防御。",
      "访问被拒绝。威胁等级提升。",
      "警告：您的行为正在被记录。"
    ],
    ja: [
      "侵入を検出しました。防御を開始します。",
      "アクセス拒否されました。脅威レベルが上昇しました。",
      "警告：あなたの行動は記録されています。"
    ]
  },
  securityLevels: ["GREEN", "YELLOW", "RED"],
  responses: {
    "solar-ai": {
      ru: "ИИ 'Helios' v2.3: Оптимизирует угол панелей каждые 0.3 сек. Использует алгоритмы NASA.",
      en: "AI 'Helios' v2.3: Optimizes panel angle every 0.3 sec. Uses NASA algorithms.",
      zh: "人工智能'Helios' v2.3: 每0.3秒优化面板角度。使用NASA算法。",
      ja: "AI'Helios' v2.3: 0.3秒ごとにパネル角度を最適化。NASAのアルゴリズムを使用。"
    },
    "solar-power": {
      ru: "Автономность: 10 кВт·ч аккумуляторы + резервные водородные элементы.",
      en: "Autonomy: 10 kW·h batteries + backup hydrogen cells.",
      zh: "自主性: 10千瓦时电池 + 备用氢燃料电池。",
      ja: "自立性: 10 kW·hバッテリー + 水素燃料バックアップ。"
    },
    "drone-creator": {
      ru: "Спасательный дрон Q1 был разработан командой инженеров Humo Corporation под руководством Jurabek Kayumov.",
      en: "Rescue Drone Q1 was developed by Humo Corporation engineering team led by Jurabek Kayumov.",
      zh: "救援无人机Q1由Humo公司工程团队在Jurabek Kayumov领导下开发。",
      ja: "救助ドローンQ1は、Jurabek Kayumov率いるHumo Corporationのエンジニアチームによって開発されました。"
    },
    "terminal-password": {
      ru: "Пароль от терминала: humo2025",
      en: "Terminal password: humo2025",
      zh: "终端密码: humo2025",
      ja: "ターミナルパスワード: humo2025"
    },
    "contacts": {
      ru: "Контактные данные Humo Corporation:<br>Email: jqayumov430@gmail.com<br>Телефон: +7 950 224-20-42",
      en: "Humo Corporation contacts:<br>Email: jqayumov430@gmail.com<br>Phone: +7 950 224-20-42",
      zh: "Humo公司联系方式:<br>电子邮件: jqayumov430@gmail.com<br>电话: +7 950 224-20-42",
      ja: "Humo Corporation連絡先:<br>Eメール: jqayumov430@gmail.com<br>電話: +7 950 224-20-42"
    }
  },
  
  getRandomResponse: function(list) {
    return list[Math.floor(Math.random() * list.length)];
  },
  
  analyzeQuestion: function(question) {
    const lowerQuestion = question.toLowerCase();
    let threatLevel = 0;
    
    if (this.threats.some(t => lowerQuestion.includes(t))) {
      threatLevel = 2;
    } else if (lowerQuestion.includes("пароль") || lowerQuestion.includes("password") || lowerQuestion.includes("密码") || lowerQuestion.includes("パスワード")) {
      threatLevel = 1;
    }
    
    if (threatLevel === 2) {
      playSound('sound-glitch');
      return {
        response: `${this.getRandomResponse(this.warnings[currentLang] || this.warnings.ru)}<br>
                  <span class="alert-text">Код угрозы: #${Math.floor(1000 + Math.random() * 9000)}</span>`,
        alert: true
      };
    }
    
    if (lowerQuestion.includes("солнечная станция") || lowerQuestion.includes("solar station") || lowerQuestion.includes("太阳能站") || lowerQuestion.includes("ソーラーステーション")) {
      return {
        response: this.responses['solar-ai'][currentLang] + "<br>" + this.responses['solar-power'][currentLang],
        alert: false
      };
    }
    
    if (lowerQuestion.includes("дрон q1") || lowerQuestion.includes("drone q1") || lowerQuestion.includes("无人机q1") || lowerQuestion.includes("ドローンq1")) {
      return {
        response: this.responses['drone-creator'][currentLang],
        alert: false
      };
    }
    
    if (lowerQuestion.includes("пароль терминала") || lowerQuestion.includes("terminal password") || lowerQuestion.includes("终端密码") || lowerQuestion.includes("ターミナルパスワード")) {
      return {
        response: this.responses['terminal-password'][currentLang],
        alert: false
      };
    }
    
    if (lowerQuestion.includes("контакты") || lowerQuestion.includes("contacts") || lowerQuestion.includes("联系方式") || lowerQuestion.includes("連絡先")) {
      return {
        response: this.responses['contacts'][currentLang],
        alert: false
      };
    }
    
    const commands = {
      "статус|status|状态|ステータス": {
        ru: `Статус системы:<br>
           - Безопасность: ${this.securityLevels[0]}<br>
           - Память: 87% свободно<br>
           - Red Queen: ONLINE`,
        en: `System status:<br>
           - Protection: ACTIVE<br>
           - Threats: NONE DETECTED<br>
           - Memory: 87% FREE<br>
           - Red Queen: ONLINE`,
        zh: `系统状态:<br>
           - 保护: 激活<br>
           - 威胁: 未检测到<br>
           - 内存: 87% 空闲<br>
           - 红后: 在线`,
        ja: `システムステータス:<br>
           - 保護: 有効<br>
           - 脅威: 検出されず<br>
           - メモリ: 87% 空き<br>
           - レッドクイーン: オンライン`
      },
      "помощь|help|帮助|ヘルプ": {
        ru: `Доступные команды:<br>
           - Статус системы<br>
           - Контакты<br>
           - Протоколы<br>
           - Активировать защиту<br>
           - Информация о дроне Q1<br>
           - Информация о солнечной станции<br>
           - Пароль терминала`,
        en: `Available commands:<br>
           - System status<br>
           - Contacts<br>
           - Protocols<br>
           - Activate protection<br>
           - Drone Q1 info<br>
           - Solar station info<br>
           - Terminal password`,
        zh: `可用命令:<br>
           - 系统状态<br>
           - 联系方式<br>
           - 协议<br>
           - 激活保护<br>
           - 无人机Q1信息<br>
           - 太阳能站信息<br>
           - 终端密码`,
        ja: `利用可能なコマンド:<br>
           - システムステータス<br>
           - 連絡先<br>
           - プロトコル<br>
           - 保護を有効化<br>
           - ドローンQ1情報<br>
           - ソーラーステーション情報<br>
           - ターミナルパスワード`
      },
      "протокол|protocol|协议|プロトコル": {
        ru: `Активные протоколы:<br>
           1. Защита данных (активен)<br>
           2. Мониторинг сети (активен)<br>
           3. Карантин (готов)`,
        en: `Active protocols:<br>
           1. Data protection (active)<br>
           2. Network monitoring (active)<br>
           3. Quarantine (ready)`,
        zh: `活动协议:<br>
           1. 数据保护 (激活)<br>
           2. 网络监控 (激活)<br>
           3. 隔离 (准备就绪)`,
        ja: `アクティブなプロトコル:<br>
           1. データ保護 (有効)<br>
           2. ネットワーク監視 (有効)<br>
           3. 隔離 (準備完了)`
      }
    };
    
    for (const key in commands) {
      if (new RegExp(key).test(lowerQuestion)) {
        return { 
          response: commands[key][currentLang] || commands[key].ru, 
          alert: false 
        };
      }
    }
    
    const randomResponses = {
      ru: [
        "Запрос не распознан. Уточните вопрос.",
        "Недостаточно данных для ответа.",
        "Доступ к этой информации ограничен."
      ],
      en: [
        "Query not recognized. Please rephrase.",
        "Insufficient data for response.",
        "Access to this information is restricted."
      ],
      zh: [
        "请求无法识别。请重新表述。",
        "数据不足无法回答。",
        "此信息访问受限。"
      ],
      ja: [
        "クエリが認識されませんでした。言い換えてください。",
        "応答するためのデータが不足しています。",
        "この情報へのアクセスは制限されています。"
      ]
    };
    
    return {
      response: this.getRandomResponse(randomResponses[currentLang] || randomResponses.ru),
      alert: false
    };
  },
  
  explain: function(topic) {
    const log = document.getElementById('chatLog');
    if (this.responses[topic]) {
      const response = this.responses[topic][currentLang] || this.responses[topic].ru;
      log.innerHTML += `<p><strong>Red Queen:</strong> ${response}</p>`;
      log.scrollTop = log.scrollHeight;
      speakAsRedQueen(response.replace(/<[^>]*>/g, ''));
    }
  }
};

function speakAsRedQueen(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 0.8;
    utterance.lang = currentLang;
    window.speechSynthesis.speak(utterance);
  }
}

function handleChat() {
  const input = document.getElementById('userInput');
  const log = document.getElementById('chatLog');
  const question = input.value.trim();
  
  if (!question) return;
  
  playSound('sound-chat');
  
  log.innerHTML += `<p><strong>You:</strong> ${escapeHtml(question)}</p>`;
  
  const loadingMsg = document.createElement('p');
  loadingMsg.innerHTML = '<strong>Red Queen:</strong> <span class="ai-response-loading">Сканирование...</span>';
  log.appendChild(loadingMsg);
  log.scrollTop = log.scrollHeight;
  
  setTimeout(() => {
    log.removeChild(loadingMsg);
    const analysis = RedQueenAI.analyzeQuestion(question);
    let response = analysis.response;
    
    if (analysis.alert) {
      document.getElementById('chatBox').style.borderColor = "red";
      setTimeout(() => {
        document.getElementById('chatBox').style.borderColor = "#ff0033";
      }, 3000);
    }
    
    log.innerHTML += `<p><strong>Red Queen:</strong> ${response}</p>`;
    log.scrollTop = log.scrollHeight;
    speakAsRedQueen(response.replace(/<[^>]*>/g, ''));
    
    localStorage.setItem('chatHistory', log.innerHTML);
  }, 1500);
  
  input.value = '';
}

const Terminal = {
  commands: {
    help: {
      ru: "Доступные команды:\n- clear: Очистить терминал\n- status: Статус системы\n- scan: Проверить безопасность\n- lockdown: Активировать протоколы защиты\n- about: Информация о Humo Corporation\n- redqueen: Информация о системе Red Queen\n- restore: Отключить режим защиты\n- solardata: Статус солнечной станции\n- deploy_solar: Активировать солнечную станцию",
      en: "Available commands:\n- clear: Clear terminal\n- status: System status\n- scan: Check security\n- lockdown: Activate protection protocols\n- about: Humo Corporation info\n- redqueen: Red Queen system info\n- restore: Disable protection mode\n- solardata: Solar station status\n- deploy_solar: Activate solar station",
      zh: "可用命令:\n- clear: 清除终端\n- status: 系统状态\n- scan: 安全检查\n- lockdown: 激活保护协议\n- about: Humo公司信息\n- redqueen: 红后系统信息\n- restore: 禁用保护模式\n- solardata: 太阳能站状态\n- deploy_solar: 激活太阳能站",
      ja: "利用可能なコマンド:\n- clear: ターミナルをクリア\n- status: システムステータス\n- scan: セキュリティチェック\n- lockdown: 保護プロトコルを有効化\n- about: Humo Corporation情報\n- redqueen: レッドクイーンシステム情報\n- restore: 保護モードを無効化\n- solardata: ソーラーステーションの状態\n- deploy_solar: ソーラーステーションを起動"
    },
    clear: function() { 
      document.getElementById('terminalOutput').innerHTML = '<p>> TERMINAL CLEARED</p>'; 
      return ""; 
    },
    status: {
      ru: "Статус системы:\n- Защита: АКТИВНА\n- Угрозы: НЕ ОБНАРУЖЕНО\n- Память: 87% СВОБОДНО\n- Red Queen: ONLINE",
      en: "System status:\n- Protection: ACTIVE\n- Threats: NONE DETECTED\n- Memory: 87% FREE\n- Red Queen: ONLINE",
      zh: "系统状态:\n- 保护: 激活\n- 威胁: 未检测到\n- 内存: 87% 空闲\n- 红后: 在线",
      ja: "システムステータス:\n- 保護: 有効\n- 脅威: 検出されず\n- メモリ: 87% 空き\n- レッドクイーン: オンライン"
    },
    scan: {
      ru: "Сканирование...\n> Проверка файловой системы... OK\n> Проверка сетевых соединений... OK\n> Проверка безопасности... OK\nОбнаружено 0 угроз",
      en: "Scanning...\n> File system check... OK\n> Network connections check... OK\n> Security check... OK\n0 threats detected",
      zh: "扫描中...\n> 文件系统检查... 正常\n> 网络连接检查... 正常\n> 安全检查... 正常\n检测到0个威胁",
      ja: "スキャン中...\n> ファイルシステムチェック... OK\n> ネットワーク接続チェック... OK\n> セキュリティチェック... OK\n脅威は検出されませんでした"
    },
    lockdown: function() {
      document.body.classList.add('lockdown-mode');
      playSound('sound-glitch');
      return {
        ru: "АКТИВАЦИЯ ПРОТОКОЛА LOCKDOWN\nВсе системы переходят в режим защиты\nВведите 'restore' для отмены",
        en: "ACTIVATING LOCKDOWN PROTOCOL\nAll systems entering protection mode\nType 'restore' to cancel",
        zh: "激活锁定协议\n所有系统进入保护模式\n输入'restore'取消",
        ja: "ロックダウンプロトコルを有効化\nすべてのシステムが保護モードに入ります\n'restore'と入力してキャンセル"
      }[currentLang];
    },
    restore: function() {
      document.body.classList.remove('lockdown-mode');
      return {
        ru: "Режим защиты деактивирован",
        en: "Protection mode deactivated",
        zh: "保护模式已停用",
        ja: "保護モードを無効化しました"
      }[currentLang];
    },
    about: {
      ru: "HUMO CORPORATION\nСпециализация: Инновационные технологии\nОснователь: Jurabek Kayumov\nСтатус: Активна",
      en: "HUMO CORPORATION\nSpecialization: Innovative technologies\nFounder: Jurabek Kayumov\nStatus: Active",
      zh: "HUMO公司\n专业领域: 创新技术\n创始人: Jurabek Kayumov\n状态: 活跃",
      ja: "HUMO CORPORATION\n専門分野: 革新的な技術\n創設者: Jurabek Kayumov\nステータス: アクティブ"
    },
    redqueen: {
      ru: "RED QUEEN SYSTEM v2.4.1\nОсновная функция: Защита системы\nСтатус: Активна\nУровень угрозы: Низкий",
      en: "RED QUEEN SYSTEM v2.4.1\nMain function: System protection\nStatus: Active\nThreat level: Low",
      zh: "红后系统 v2.4.1\n主要功能: 系统保护\n状态: 活跃\n威胁等级: 低",
      ja: "レッドクイーンシステム v2.4.1\n主な機能: システム保護\nステータス: 作動中\n脅威レベル: 低"
    },
    solardata: {
      ru: "Солнечная станция S1:\n- Статус: ONLINE\n- Режим: Дневной\n- Мощность: 2.1 кВт",
      en: "Solar Station S1:\n- Status: ONLINE\n- Mode: Day\n- Power: 2.1 kW",
      zh: "太阳能站 S1:\n- 状态: 在线\n- 模式: 白天\n- 功率: 2.1 千瓦",
      ja: "ソーラーステーション S1:\n- ステータス: オンライン\n- モード: 昼間\n- 電力: 2.1 kW"
    },
    deploy_solar: {
      ru: ">> Активирован протокол 'Фотон'\n>> ИИ Helios инициализирован\n>> Панели развернуты",
      en: ">> Protocol 'Photon' activated\n>> AI Helios initialized\n>> Panels deployed",
      zh: ">> 激活'光子'协议\n>> 人工智能Helios已初始化\n>> 面板已展开",
      ja: ">> プロトコル'フォトン'を有効化\n>> AI Heliosを初期化\n>> パネルを展開しました"
    }
  },
  
  execute: function(cmd) {
    cmd = cmd.toLowerCase().trim();
    
    if (cmd === '') return "";
    
    if (this.commands[cmd]) {
      if (typeof this.commands[cmd] === 'function') {
        return this.commands[cmd]();
      }
      return typeof this.commands[cmd] === 'object' 
        ? this.commands[cmd][currentLang] || this.commands[cmd].ru 
        : this.commands[cmd];
    }
    
    return {
      ru: `Команда "${cmd}" не найдена. Введите "help" для списка команд.`,
      en: `Command "${cmd}" not found. Type "help" for commands list.`,
      zh: `未找到命令"${cmd}"。输入"help"查看命令列表。`,
      ja: `コマンド"${cmd}"が見つかりません。"help"と入力してコマンドリストを表示。`
    }[currentLang];
  }
};

function toggleTerminal() {
  const terminal = document.getElementById('humoTerminal');
  terminalVisible = !terminalVisible;
  
  if (terminalVisible) {
    terminal.classList.add('visible');
    document.getElementById('terminalCommand').focus();
    playSound('sound-terminal');
    
    if (!terminalUnlocked) {
      document.getElementById('terminalCommand').type = 'password';
      document.getElementById('terminalCommand').placeholder = {
        ru: 'Введите код доступа...',
        en: 'Enter access code...',
        zh: '输入访问代码...',
        ja: 'アクセスコードを入力...'
      }[currentLang];
    } else {
      document.getElementById('terminalCommand').type = 'text';
      document.getElementById('terminalCommand').placeholder = {
        ru: 'Введите команду...',
        en: 'Enter command...',
        zh: '输入命令...',
        ja: 'コマンドを入力...'
      }[currentLang];
    }
  } else {
    terminal.classList.remove('visible');
  }
}

document.getElementById('terminalCommand').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    const cmd = this.value;
    const output = document.getElementById('terminalOutput');
    
    if (!terminalUnlocked) {
      if (cmd === TERMINAL_PASSWORD) {
        terminalUnlocked = true;
        this.type = 'text';
        this.placeholder = {
          ru: 'Введите команду...',
          en: 'Enter command...',
          zh: '输入命令...',
          ja: 'コマンドを入力...'
        }[currentLang];
        output.innerHTML += `<p>> Access granted. Welcome, authorized user.</p>`;
        output.innerHTML += `<p>> Type 'help' for commands list</p>`;
      } else {
        output.innerHTML += `<p>> ACCESS DENIED. INITIATING COUNTERMEASURES...</p>`;
        setTimeout(() => {
          output.innerHTML += `<p class="alert-text">> WARNING: MALICIOUS CODE DETECTED</p>`;
          document.getElementById('humoTerminal').style.borderColor = "red";
          playSound('sound-glitch');
        }, 1000);
      }
    } else {
      output.innerHTML += `<p>> ${escapeHtml(cmd)}</p>`;
      const result = Terminal.execute(cmd);
      if (result) output.innerHTML += `<p>${result.replace(/\n/g, '<br>')}</p>`;
    }
    
    this.value = '';
    output.scrollTop = output.scrollHeight;
    playSound('sound-terminal');
  }
});

document.getElementById('userInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') handleChat();
});

document.querySelectorAll('.language-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    switchLanguage(this.dataset.lang);
  });
});

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

document.addEventListener('DOMContentLoaded', function() {
  switchLanguage('ru');
  
  const savedChat = localStorage.getItem('chatHistory');
  if (savedChat) {
    document.getElementById('chatLog').innerHTML = savedChat;
  }
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 20,
          behavior: 'smooth'
        });
      }
    });
  });
});