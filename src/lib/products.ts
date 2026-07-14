import type { Product } from "@/types";

const placeholderImg = (label: string, color = "1E3A8A") =>
  `https://placehold.co/600x600/${color}/FFFFFF?text=${encodeURIComponent(label)}`;

export const products: Product[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // HERO 1 — Knee Joint Massager (FLAGSHIP — highest perceived value)
  // ──────────────────────────────────────────────────────────────────────────
  {
    sku: "knee-joint-massager",
    slug: "knee-joint-massager",
    nameAr: "جهاز مساج الركبة بالضوء الأحمر والحرارة",
    taglineAr: "ألم الركبة يسرق حركتك — استرجعها في ١٥ دقيقة",
    descriptionAr:
      "جهاز علاج الركبة المتطور يجمع بين الحرارة العلاجية والضوء الأحمر (660nm) والمساج الاهتزازي في جهاز واحد — يخفف ألم المفاصل والتيبّس ويحسّن الحركة من راحة بيتك، بدون حبوب وبدون عيادات. مصمم بالتعاون مع أخصائيي العلاج الطبيعي.",
    image: "/products/knee-main.png",
    images: [
      "/products/knee-main.png",
      "/products/knee-lifestyle.png",
      "/products/knee-redlight.png",
      "/products/knee-mechanism.png",
    ],
    basePrice: 29.9,
    otoPrice: 25.4, // 15% off
    offers: [
      { qty: 1, label: "قطعة واحدة", unitPrice: 29.9, lineTotal: 29.9, savePercent: 0 },
      { qty: 2, label: "قطعتين (لك ولشريكك)", unitPrice: 24.95, lineTotal: 49.9, savePercent: 17, badge: "الأكثر مبيعاً" },
      { qty: 3, label: "ثلاث قطع", unitPrice: 21.5, lineTotal: 64.5, savePercent: 28, badge: "أفضل قيمة" },
    ],
    category: "أجهزة العلاج",
    painPoints: [
      "ألم في الركبة عند صعود ونزول الدرج",
      "تيبّس وطقطقة في المفصل خاصة الصباح",
      "خشونة وآلام الركبة مع التقدم في العمر",
      "تورّم بعد المشي أو الوقوف الطويل",
      "مسكّنات تخفي الألم ولا تعالج السبب",
      "جلسات العلاج الطبيعي مكلفة ومتعبة",
    ],
    benefits: [
      "راحة محسوسة خلال ١٥ دقيقة يومياً",
      "حرارة + ضوء أحمر + مساج في جهاز واحد",
      "يحسّن الدورة الدموية ويقلّل التيبّس والتورّم",
      "لاسلكي بالكامل — استخدمه وأنت تشاهد التلفاز",
      "مقاسات قابلة للتعديل تناسب كل الأحجام",
      "هدية مثالية للوالدين — بدون حبوب ولا آثار جانبية",
    ],
    mechanism: [
      {
        icon: "🌡️",
        image: "/products/mech-heat.png",
        titleAr: "الحرارة العلاجية",
        descAr: "حرارة لطيفة قابلة للتحكم ترفع تدفق الدم للمفصل حتى 40% — تغذّي الغضروف، تقلّل التيبّس وتخفف إحساس الاحتكاك داخل الركبة.",
      },
      {
        icon: "🔴",
        image: "/products/mech-redlight.png",
        titleAr: "الضوء الأحمر 660nm",
        descAr: "أمواج الضوء الأحمر تخترق الأنسجة بعمق لتحفيز تجدد الخلايا وتقليل الالتهاب — نفس التقنية المستخدمة في عيادات الفيزيوثيرابي.",
      },
      {
        icon: "💆",
        image: "/products/mech-vibration.png",
        titleAr: "المساج الاهتزازي الذكي",
        descAr: "أنماط اهتزاز متدرّجة صمّمها أخصائيو العلاج الطبيعي لإرخاء العضلات حول المفصل وقطع إشارات الألم.",
      },
      {
        icon: "🔋",
        image: "/products/mech-wireless.png",
        titleAr: "لاسلكي وقابل للشحن",
        descAr: "بطارية تدوم لساعات وشحن USB-C. جلسة تلقائية 15 دقيقة مع إيقاف ذاتي للأمان.",
      },
    ],
    reviews: [
      {
        nameAr: "أبو عبدالعزيز",
        locationAr: "الجهراء، الكويت",
        rating: 5,
        textAr: "عمري ٥٨ سنة وركبتي كانت تعذبني بالدرج. بعد أسبوعين استخدام يومي صرت أنزل الدرج بدون ما أمسك الجدار. الله يعطيهم العافية.",
        date: "يونيو 2026",
      },
      {
        nameAr: "منيرة العنزي",
        locationAr: "السالمية، الكويت",
        rating: 5,
        textAr: "اشتريته لأمي عندها خشونة بالركبة. تستخدمه كل ليلة وتقول التورم قل والنوم صار أريح. أخذنا ٢ عشان ركبتيها الثنتين.",
        date: "مايو 2026",
      },
      {
        nameAr: "يوسف الفضلي",
        locationAr: "حولي، الكويت",
        rating: 5,
        textAr: "ألعب كرة والركبة دايماً تتعبني بعد المباراة. الحرارة والاهتزاز يريحونها بشكل خرافي. يستاهل كل فلس.",
        date: "يونيو 2026",
      },
      {
        nameAr: "أم فهد",
        locationAr: "الأحمدي، الكويت",
        rating: 4,
        textAr: "جودة ممتازة والتوصيل جاء خلال يومين والدفع عند الاستلام. الجهاز مريح والحرارة تحس فيها من أول مرة.",
        date: "يوليو 2026",
      },
    ],
    faqs: [
      {
        questionAr: "هل ينفع لخشونة الركبة والتقدم في العمر؟",
        answerAr: "نعم، الحرارة والضوء الأحمر يساعدان على تقليل التيبّس والالتهاب وتحسين الحركة، وهو مناسب جداً لكبار السن والخشونة.",
      },
      {
        questionAr: "كم جلسة أحتاج في اليوم؟",
        answerAr: "يُنصح بجلسة واحدة ١٥ دقيقة يومياً لكل ركبة. أغلب العملاء يحسّون بفرق خلال أول أسبوع إلى أسبوعين.",
      },
      {
        questionAr: "هل يناسب كل مقاسات الركبة؟",
        answerAr: "نعم، الأحزمة قابلة للتعديل وتناسب معظم المقاسات بشكل مريح.",
      },
      {
        questionAr: "هل يمكن استخدامه على الكتف أو الكوع؟",
        answerAr: "نعم، بفضل الأحزمة المرنة يمكن استخدامه على الكتف والكوع والفخذ لأي ألم مفصلي.",
      },
    ],
    badge: "الأقوى — الأكثر طلباً",
    role: "hero",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // HERO 2 — Cupping Therapy Massager
  // ──────────────────────────────────────────────────────────────────────────
  {
    sku: "cupping-therapy-massager",
    slug: "cupping-therapy-massager",
    nameAr: "جهاز الحجامة الكهربائي مع العلاج بالضوء الأحمر",
    taglineAr: "ظهرك ما يستاهل كل هذا الألم",
    descriptionAr:
      "جهاز الحجامة الكهربائي المتطور يجمع بين تقنية الشفط الهوائي والضوء الأحمر العلاجي لتخفيف ألم الظهر والرقبة والكتفين من راحة بيتك — بدون عيادات وبدون حرق.",
    image: "/products/cupping-main.png",
    images: [
      "/products/cupping-main.png",
      "/products/cupping-lifestyle.png",
      "/products/cupping-redlight.png",
      "/products/cupping-controls.png",
    ],
    basePrice: 17.9,
    otoPrice: 15.2, // 15% off
    offers: [
      { qty: 1, label: "قطعة واحدة", unitPrice: 17.9, lineTotal: 17.9, savePercent: 0 },
      { qty: 2, label: "قطعتين", unitPrice: 13.95, lineTotal: 27.9, savePercent: 22, badge: "الأكثر مبيعاً" },
      { qty: 3, label: "ثلاث قطع", unitPrice: 11.97, lineTotal: 35.9, savePercent: 33, badge: "أفضل قيمة" },
    ],
    category: "أجهزة العلاج",
    painPoints: [
      "ألم مزمن في الظهر بعد السواقة أو الجلوس الطويل",
      "توتر وتصلب في الكتف والرقبة من الشغل",
      "تعب عضلي لا يروح بالمسكنات",
      "ما تقدر تنام مرتاح بسبب الألم",
      "تكاليف العيادات والجلسات الباهظة",
    ],
    benefits: [
      "راحة فورية خلال 20 دقيقة في البيت",
      "12 مستوى شفط قابل للتعديل حسب راحتك",
      "ضوء أحمر 630nm يعزز التعافي العضلي",
      "لاسلكي بالكامل — استخدمه في أي مكان",
      "بديل آمن للحجامة التقليدية — بدون حرق",
    ],
    mechanism: [
      {
        icon: "🔴",
        image: "/products/cupping-mech-redlight.png",
        titleAr: "الضوء الأحمر العلاجي",
        descAr: "أمواج الضوء الأحمر (630nm) تخترق الأنسجة بعمق لتحفيز إنتاج الطاقة الخلوية وتسريع التعافي — نفس التقنية المستخدمة في عيادات الفيزيوثيرابي.",
      },
      {
        icon: "💨",
        image: "/products/cupping-mech-suction.png",
        titleAr: "الشفط الهوائي الذكي",
        descAr: "يرفع الأنسجة بلطف ويحسن الدورة الدموية في المنطقة المؤلمة — نفس مبدأ الحجامة التقليدية لكن بتحكم كامل وبدون أي ألم.",
      },
      {
        icon: "🎚️",
        image: "/products/cupping-mech-levels.png",
        titleAr: "12 مستوى تحكم دقيق",
        descAr: "من مساج خفيف للاسترخاء اليومي إلى علاج عميق للألم المزمن — أنت تتحكم في شدة الجلسة.",
      },
      {
        icon: "🔋",
        image: "/products/cupping-mech-wireless.png",
        titleAr: "لاسلكي وقابل للشحن",
        descAr: "بطارية تدوم 4+ ساعات. شحن USB-C سريع. استخدمه على الأريكة، في المكتب، أو في السيارة.",
      },
    ],
    reviews: [
      {
        nameAr: "أحمد العازمي",
        locationAr: "السالمية، الكويت",
        rating: 5,
        textAr: "كنت أشرب مسكنات كل يوم بسبب ظهري. من أول أسبوع استخدام، الفرق واضح جداً. أنصح فيه كل واحد يعاني من ألم الظهر.",
        date: "مايو 2026",
      },
      {
        nameAr: "فيصل المطيري",
        locationAr: "حولي، الكويت",
        rating: 5,
        textAr: "اشتريت 2 قطع — واحدة لي وواحدة لأبوي. كلنا راضين. جودة ممتازة والنتيجة محسوسة.",
        date: "يونيو 2026",
      },
      {
        nameAr: "ناصر الرشيدي",
        locationAr: "الفروانية، الكويت",
        rating: 5,
        textAr: "أفضل شي اشتريته هذا السنة. ألم الكتف اللي كان يصحيني بالليل خف كثير بعد أسبوعين.",
        date: "يونيو 2026",
      },
      {
        nameAr: "محمد الحربي",
        locationAr: "الجهراء، الكويت",
        rating: 4,
        textAr: "جهاز ممتاز، سهل الاستخدام والضوء الأحمر يحس فيه فعلاً. التوصيل كان سريع.",
        date: "يوليو 2026",
      },
    ],
    faqs: [
      {
        questionAr: "هل الجهاز آمن للاستخدام اليومي؟",
        answerAr: "نعم، مصمم للاستخدام اليومي. يُنصح بجلسة 15-20 دقيقة على منطقة واحدة.",
      },
      {
        questionAr: "هل يناسب الحجامة التقليدية؟",
        answerAr: "يعمل على نفس مبدأ الحجامة (الشفط الهوائي) لكن بدون حرار أو حرق — أكثر أماناً وراحة.",
      },
      {
        questionAr: "كم يدوم الشحن؟",
        answerAr: "4+ ساعات استخدام متواصل على شحنة كاملة.",
      },
      {
        questionAr: "هل يناسب مناطق معينة فقط؟",
        answerAr: "يصلح للظهر، الرقبة، الكتفين، الساقين، والبطن.",
      },
    ],
    badge: "الأكثر مبيعاً",
    role: "hero",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // HERO 3 — Foot Massager
  // ──────────────────────────────────────────────────────────────────────────
  {
    sku: "foot-massager",
    slug: "foot-massager",
    nameAr: "جهاز مساج الأقدام الاحترافي",
    taglineAr: "أقدامك تتحمل الكثير كل يوم — تستحق راحة حقيقية",
    descriptionAr:
      "سجادة مساج الأقدام بتقنية EMS والنبضات الكهربائية تريح أقدامك المتعبة وتحسّن الدورة الدموية بعد يوم طويل — لاسلكية وقابلة للطي، جلسة 15 دقيقة قبل النوم وتفرق الفرق كبير.",
    image: "/products/foot-main.png",
    images: [
      "/products/foot-main.png",
      "/products/foot-lifestyle.png",
      "/products/foot-ems.png",
      "/products/foot-portable.png",
    ],
    basePrice: 19.9,
    otoPrice: 16.9,
    offers: [
      { qty: 1, label: "قطعة واحدة", unitPrice: 19.9, lineTotal: 19.9, savePercent: 0 },
      { qty: 2, label: "قطعتين", unitPrice: 15.95, lineTotal: 31.9, savePercent: 20, badge: "هدية مثالية" },
      { qty: 3, label: "ثلاث قطع", unitPrice: 13.97, lineTotal: 41.9, savePercent: 30, badge: "أفضل قيمة" },
    ],
    category: "أجهزة العلاج",
    painPoints: [
      "أقدام متورمة ومتعبة بعد يوم طويل",
      "آلام وحرقان في القدمين من الوقوف أو المشي",
      "ضعف الدورة الدموية في الساقين",
      "نوم مضطرب بسبب تعب الأقدام",
      "ما عندك وقت للسبا أو جلسات التدليك",
    ],
    benefits: [
      "راحة فورية خلال 15 دقيقة فقط",
      "نبضات EMS تحاكي مساج المحترفين",
      "حرارة علاجية تحسن الدورة الدموية",
      "أوضاع متعددة وشدة قابلة للتعديل",
      "خفيف وقابل للطي — هدية مثالية",
    ],
    mechanism: [
      {
        icon: "⚡",
        image: "/products/foot-mech-ems.png",
        titleAr: "نبضات EMS الذكية",
        descAr: "نبضات كهربائية لطيفة تحفّز عضلات القدم والساق وتحسّن الدورة الدموية — نفس تقنية المساج المستخدمة في العيادات.",
      },
      {
        icon: "🌡️",
        image: "/products/foot-mech-heat.png",
        titleAr: "الحرارة العلاجية",
        descAr: "حرارة لطيفة تسترخي العضلات وتخفف الآلام والتعب — مثل الكمادة الدافئة لكن أكثر فاعلية.",
      },
      {
        icon: "👣",
        image: "/products/foot-mech-reflexology.png",
        titleAr: "العلاج بالانعكاس (Reflexology)",
        descAr: "النقاط الضاغطة على القدم مرتبطة بكل أعضاء الجسم — تدليك القدم يُريح الجسم كله.",
      },
      {
        icon: "📱",
        image: "/products/foot-mech-controls.png",
        titleAr: "تحكم سهل بزر واحد",
        descAr: "وحدة تحكم لاسلكية بشاشة رقمية — أوضاع وشدات متعددة بأزرار + / M / − بدون أي تعقيد.",
      },
    ],
    reviews: [
      {
        nameAr: "منى العتيبي",
        locationAr: "الكويت، مدينة",
        rating: 5,
        textAr: "اشتريته لأمي وهي ما تصدق الراحة. الحين تستخدمه كل ليلة قبل النوم وتقول نومها تحسن كثير.",
        date: "يونيو 2026",
      },
      {
        nameAr: "سارة الشمري",
        locationAr: "الجهراء، الكويت",
        rating: 5,
        textAr: "معلمة وأوقف 6 ساعات يومياً. هذا الجهاز غير حياتي. أقدامي ما تتألم بعد الشغل.",
        date: "مايو 2026",
      },
      {
        nameAr: "نورة الكندري",
        locationAr: "السالمية، الكويت",
        rating: 5,
        textAr: "هدية جنان. أخذت 2 قطع، واحدة لي وواحدة لأختي. التوصيل جاء بكرة واحدة.",
        date: "يوليو 2026",
      },
    ],
    faqs: [
      {
        questionAr: "هل يناسب جميع أحجام القدم؟",
        answerAr: "نعم، مصمم لكل المقاسات من 36 إلى 46.",
      },
      {
        questionAr: "هل يمكن استخدامه مع الجوارب؟",
        answerAr: "نعم يعمل مع الجوارب الخفيفة، لكن بدون جوارب الفاعلية أكثر.",
      },
      {
        questionAr: "هل ينفع لمرضى السكري؟",
        answerAr: "يُنصح باستشارة الطبيب أولاً لمرضى السكري أو من لديهم مشاكل في الأعصاب.",
      },
    ],
    badge: "مثالي للهدايا",
    role: "hero",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // ADD-ON 1 — Joint Treatment Gel (best upsell — cheap, high impulse)
  // ──────────────────────────────────────────────────────────────────────────
  {
    sku: "joint-relief-gel",
    slug: "joint-relief-gel",
    nameAr: "جل علاج المفاصل الطبيعي",
    taglineAr: "راحة المفاصل من الطبيعة — تحسها من أول تطبيق",
    descriptionAr:
      "تركيبة طبيعية مركزة للمفاصل والعضلات — ضعه على الركبة أو الكتف أو الظهر واحس بالدفء والراحة خلال دقائق. الأفضل مع أجهزة الراحة للنتيجة الأسرع.",
    image: "/products/gel-main.png",
    images: [
      "/products/gel-main.png",
      "/products/gel-natural.png",
      "/products/gel-apply.png",
      "/products/gel-lifestyle.png",
    ],
    basePrice: 6.9,
    otoPrice: 3.9, // deep OTO discount (~43%) — cheap add-on, boosts attach rate
    offers: [
      { qty: 1, label: "قطعة واحدة", unitPrice: 6.9, lineTotal: 6.9, savePercent: 0 },
      { qty: 2, label: "قطعتين", unitPrice: 5.95, lineTotal: 11.9, savePercent: 14, badge: "الأكثر طلباً" },
      { qty: 3, label: "ثلاث قطع", unitPrice: 4.97, lineTotal: 14.9, savePercent: 28, badge: "عرض العائلة" },
    ],
    category: "العناية الطبيعية",
    painPoints: [
      "تصلب المفاصل صباحاً خاصة الركبة واليد",
      "ألم مزمن في المفاصل يعيق حركتك اليومية",
      "التهابات وانتفاخ المفاصل",
      "آلام الظهر والعضلات بعد الإجهاد",
      "تعب الساقين والقدمين",
    ],
    benefits: [
      "يحس بالدفء والراحة خلال دقيقتين",
      "مكونات طبيعية 100% آمنة للاستخدام اليومي",
      "يعزز فاعلية أجهزة الراحة عند استخدامهم معاً",
      "خفيف وغير دهني — يُمتص بسرعة",
      "مناسب لكل مناطق الجسم",
    ],
    mechanism: [
      {
        icon: "🌿",
        image: "/products/gel-mech-natural.png",
        titleAr: "مستخلصات طبيعية مركزة",
        descAr: "خليط من المكونات الطبيعية المعروفة بخصائصها المسكنة والمضادة للالتهاب — تعمل بسرعة على المنطقة المؤلمة.",
      },
      {
        icon: "🔥",
        image: "/products/gel-mech-warming.png",
        titleAr: "تأثير الإحماء (Warming Effect)",
        descAr: "يولد دفء لطيف يحفز الدورة الدموية في المفصل — مثل الكمادة الدافئة لكن أعمق تأثيراً.",
      },
      {
        icon: "💧",
        image: "/products/gel-mech-absorb.png",
        titleAr: "امتصاص سريع",
        descAr: "تركيبة خفيفة تتسرب للأنسجة العميقة بسرعة دون إحساس دهني.",
      },
      {
        icon: "🤝",
        image: "/products/gel-mech-combo.png",
        titleAr: "أقوى مع الجهاز",
        descAr: "استخدامه قبل جلسة الحجامة أو مساج الأقدام أو الركبة يضاعف فاعلية العلاج.",
      },
    ],
    reviews: [
      {
        nameAr: "خالد البراك",
        locationAr: "الفروانية، الكويت",
        rating: 5,
        textAr: "ركبتي كانت تؤلمني كل يوم. مع جهاز الركبة والجل سوياً، الألم خف بشكل ملحوظ خلال أسبوعين.",
        date: "يونيو 2026",
      },
      {
        nameAr: "أم عبدالله",
        locationAr: "حولي، الكويت",
        rating: 5,
        textAr: "زوجي عنده آلام ظهر مزمنة. الجل يساعده كل ليلة. ريحة طيبة وما يحرق الجلد.",
        date: "مايو 2026",
      },
    ],
    faqs: [
      {
        questionAr: "هل يناسب كل أنواع البشرة؟",
        answerAr: "نعم، مكوناته طبيعية ومناسبة لجميع أنواع البشرة. جرب على منطقة صغيرة أولاً إذا عندك حساسية.",
      },
      {
        questionAr: "كم مرة يُستخدم يومياً؟",
        answerAr: "يمكن استخدامه 2-3 مرات يومياً على المنطقة المؤلمة.",
      },
      {
        questionAr: "هل يغني عن الأدوية؟",
        answerAr: "هو مكمل طبيعي للراحة اليومية وليس دواء. للحالات الشديدة راجع طبيبك.",
      },
    ],
    badge: "مكمل مثالي",
    role: "addon",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // ADD-ON 2 — Back Support Belt (different problem: lower back)
  // ──────────────────────────────────────────────────────────────────────────
  {
    sku: "back-support-belt",
    slug: "back-support-belt",
    nameAr: "حزام دعم الظهر الطبي",
    taglineAr: "سند لظهرك طوال اليوم — وقفة أصح وألم أقل",
    descriptionAr:
      "حزام طبي مريح يسند أسفل الظهر ويوزّع الضغط بالتساوي أثناء الجلوس أو الوقوف أو رفع الأشياء — يقلّل آلام أسفل الظهر ويحسّن وقفتك على مدار اليوم.",
    image: "/products/belt-main.png",
    images: [
      "/products/belt-main.png",
      "/products/belt-office.png",
      "/products/belt-under.png",
      "/products/belt-macro.png",
    ],
    basePrice: 7.9,
    otoPrice: 4.9, // deep OTO discount (~38%)
    offers: [
      { qty: 1, label: "قطعة واحدة", unitPrice: 7.9, lineTotal: 7.9, savePercent: 0 },
      { qty: 2, label: "قطعتين", unitPrice: 6.45, lineTotal: 12.9, savePercent: 18, badge: "الأكثر طلباً" },
      { qty: 3, label: "ثلاث قطع", unitPrice: 5.63, lineTotal: 16.9, savePercent: 29, badge: "أفضل قيمة" },
    ],
    category: "أجهزة العلاج",
    painPoints: [
      "ألم أسفل الظهر من الجلوس أو الوقوف الطويل",
      "إجهاد الظهر عند رفع الأشياء الثقيلة",
      "وقفة منحنية تزيد الألم مع الوقت",
      "شد وتعب في منطقة الحوض والفقرات",
    ],
    benefits: [
      "سند فوري لأسفل الظهر يخفف الضغط",
      "يشجّع على وقفة صحيحة تلقائياً",
      "قماش مريح يتنفّس — يُلبس تحت الملابس",
      "مقاس قابل للتعديل يناسب الجميع",
    ],
    mechanism: [
      {
        icon: "🎯",
        image: "/products/belt-mech-align.png",
        titleAr: "دعم مستهدف للفقرات",
        descAr: "دعامات مرنة تسند أسفل الظهر وتوزّع الحِمل بعيداً عن الفقرات المتعبة.",
      },
      {
        icon: "🧍",
        image: "/products/belt-mech-muscle.png",
        titleAr: "تصحيح الوقفة",
        descAr: "يذكّر جسمك بالوقفة الصحيحة ويقلّل الانحناء الذي يسبب الألم المزمن.",
      },
      {
        icon: "🌬️",
        image: "/products/belt-mech-breeze.png",
        titleAr: "قماش مريح متنفّس",
        descAr: "خامة خفيفة لا تسبب التعرّق، مريحة للبس الطويل في الشغل أو السواقة.",
      },
    ],
    reviews: [
      {
        nameAr: "بدر العجمي",
        locationAr: "الأحمدي، الكويت",
        rating: 5,
        textAr: "أشتغل ساعات طويلة وقوف. الحزام خفّف ألم ظهري بشكل واضح وأقدر ألبسه تحت الدشداشة بدون ما يبين.",
        date: "يونيو 2026",
      },
      {
        nameAr: "أم يعقوب",
        locationAr: "الفروانية، الكويت",
        rating: 5,
        textAr: "استخدمه مع جهاز الحجامة، صار ظهري أرتاح بكثير. مريح وسهل التعديل.",
        date: "مايو 2026",
      },
    ],
    faqs: [
      {
        questionAr: "هل يمكن لبسه طوال اليوم؟",
        answerAr: "يُنصح بلبسه ٢-٤ ساعات في أوقات الجهد أو الجلوس الطويل، وليس أثناء النوم.",
      },
      {
        questionAr: "هل يناسب كل المقاسات؟",
        answerAr: "نعم، الحزام قابل للتعديل ويناسب معظم المقاسات بشكل مريح.",
      },
    ],
    badge: "سند لظهرك",
    role: "addon",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // ADD-ON 3 — Smart Posture Corrector (different problem: neck/upper back)
  // ──────────────────────────────────────────────────────────────────────────
  {
    sku: "posture-corrector",
    slug: "posture-corrector",
    nameAr: "مصحّح الوضعية الذكي للظهر والكتفين",
    taglineAr: "وقفة واثقة وظهر مستقيم — بدون ما تفكّر",
    descriptionAr:
      "مصحّح وضعية مريح يسحب كتفيك للخلف بلطف ويعيد ظهرك لوضعه الطبيعي — يخفف ألم الرقبة وأعلى الظهر الناتج عن الجوال والمكتب، ويمنحك وقفة أكثر ثقة.",
    image: "/products/posture-main.png",
    images: [
      "/products/posture-main.png",
      "/products/posture-office.png",
      "/products/posture-home.png",
      "/products/posture-flex.png",
    ],
    basePrice: 9.9,
    otoPrice: 5.9, // deep OTO discount (~40%)
    offers: [
      { qty: 1, label: "قطعة واحدة", unitPrice: 9.9, lineTotal: 9.9, savePercent: 0 },
      { qty: 2, label: "قطعتين", unitPrice: 7.95, lineTotal: 15.9, savePercent: 20, badge: "الأكثر طلباً" },
      { qty: 3, label: "ثلاث قطع", unitPrice: 6.97, lineTotal: 20.9, savePercent: 30, badge: "أفضل قيمة" },
    ],
    category: "أجهزة العلاج",
    painPoints: [
      "انحناء الظهر والكتفين من الجوال والكمبيوتر",
      "ألم في الرقبة وأعلى الظهر",
      "وقفة منحنية تؤثر على مظهرك وثقتك",
      "شد مستمر بين لوحي الكتف",
    ],
    benefits: [
      "يسحب الكتفين للخلف بلطف طوال اليوم",
      "يخفف ألم الرقبة وأعلى الظهر",
      "خفيف ومخفي تحت الملابس",
      "مقاس قابل للتعديل للرجال والنساء",
    ],
    mechanism: [
      {
        icon: "🎯",
        image: "/products/posture-mech-sensor.png",
        titleAr: "محاذاة الكتفين",
        descAr: "يعيد الكتفين لوضعهما الطبيعي ويقلّل الضغط على الرقبة والفقرات العلوية.",
      },
      {
        icon: "🧠",
        image: "/products/posture-mech-train.png",
        titleAr: "إعادة تدريب العضلات",
        descAr: "الاستخدام المنتظم يدرّب عضلات ظهرك على الوقفة الصحيحة حتى بدون الجهاز.",
      },
      {
        icon: "👕",
        image: "/products/posture-mech-alert.png",
        titleAr: "خفيف ومريح",
        descAr: "تصميم رفيع يُلبس تحت الملابس بدون أن يظهر أو يزعج.",
      },
    ],
    reviews: [
      {
        nameAr: "عبدالله السالم",
        locationAr: "السالمية، الكويت",
        rating: 5,
        textAr: "أجلس أمام الكمبيوتر ساعات وظهري صار منحني. بعد أسبوع استخدام حسيت رقبتي أرتاح ووقفتي تحسنت.",
        date: "يونيو 2026",
      },
      {
        nameAr: "دلال المطيري",
        locationAr: "حولي، الكويت",
        rating: 4,
        textAr: "مريح وما يبين تحت العباية. يذكّرني أعدّل وقفتي طول الوقت.",
        date: "مايو 2026",
      },
    ],
    faqs: [
      {
        questionAr: "كم مدة استخدامه يومياً؟",
        answerAr: "ابدأ بـ ٣٠ دقيقة يومياً وزِد تدريجياً حتى ٢-٣ ساعات مع تعوّد جسمك.",
      },
      {
        questionAr: "هل يناسب الرجال والنساء؟",
        answerAr: "نعم، المقاس قابل للتعديل ويناسب الجميع.",
      },
    ],
    badge: "وقفة أصح",
    role: "addon",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // ADD-ON 4 — Neck & Shoulder Mini Massager (different problem: neck tension)
  // ──────────────────────────────────────────────────────────────────────────
  {
    sku: "neck-shoulder-massager",
    slug: "neck-shoulder-massager",
    nameAr: "جهاز مساج الرقبة والكتف المصغّر",
    taglineAr: "شيل تعب الرقبة في أي وقت وأي مكان",
    descriptionAr:
      "جهاز مساج مصغّر بالنبضات الكهربائية والحرارة يستهدف شد الرقبة والكتف — صغير يدخل الجيب، تستخدمه في المكتب أو السيارة أو البيت لراحة فورية من التوتر العضلي.",
    image: "/products/neck-main.png",
    images: [
      "/products/neck-main.png",
      "/products/neck-office.png",
      "/products/neck-car.png",
      "/products/neck-portable.png",
    ],
    basePrice: 8.9,
    otoPrice: 4.9, // deep OTO discount (~45%)
    offers: [
      { qty: 1, label: "قطعة واحدة", unitPrice: 8.9, lineTotal: 8.9, savePercent: 0 },
      { qty: 2, label: "قطعتين", unitPrice: 6.95, lineTotal: 13.9, savePercent: 22, badge: "الأكثر طلباً" },
      { qty: 3, label: "ثلاث قطع", unitPrice: 5.97, lineTotal: 17.9, savePercent: 33, badge: "أفضل قيمة" },
    ],
    category: "أجهزة العلاج",
    painPoints: [
      "شد وتصلب في الرقبة من الجوال والمكتب",
      "توتر بين الرقبة والكتف آخر اليوم",
      "صداع ناتج عن شد عضلات الرقبة",
      "ما عندك وقت لجلسة مساج كاملة",
    ],
    benefits: [
      "راحة فورية للرقبة خلال دقائق",
      "نبضات كهربائية + حرارة لإرخاء العضلات",
      "صغير ومحمول — استخدمه بأي مكان",
      "قابل للشحن USB وسهل الاستخدام",
    ],
    mechanism: [
      {
        icon: "⚡",
        image: "/products/neck-mech-tens.png",
        titleAr: "نبضات TENS",
        descAr: "نبضات كهربائية لطيفة تحفّز العضلات وتقطع إشارات الألم في الرقبة والكتف.",
      },
      {
        icon: "🌡️",
        image: "/products/neck-mech-heat.png",
        titleAr: "حرارة مريحة",
        descAr: "حرارة خفيفة ترخي العضلات المشدودة وتزيد تدفق الدم للمنطقة.",
      },
      {
        icon: "🎒",
        image: "/products/neck-mech-mobile.png",
        titleAr: "محمول بالكامل",
        descAr: "حجم صغير يدخل الجيب أو الشنطة — راحة في المكتب، السيارة، أو السفر.",
      },
    ],
    reviews: [
      {
        nameAr: "هند العنزي",
        locationAr: "الكويت، مدينة",
        rating: 5,
        textAr: "رقبتي دايماً مشدودة من الشغل على اللابتوب. الجهاز الصغير هذا صار ينقذني كل يوم بالمكتب.",
        date: "يونيو 2026",
      },
      {
        nameAr: "طلال الدوسري",
        locationAr: "الجهراء، الكويت",
        rating: 5,
        textAr: "أخذته مع جهاز الحجامة. حجمه صغير بس قوي، الحرارة والنبضات يريحون الرقبة بسرعة.",
        date: "مايو 2026",
      },
    ],
    faqs: [
      {
        questionAr: "هل النبضات مؤلمة؟",
        answerAr: "لا، تبدأ بمستوى خفيف جداً وتتحكم أنت في الشدة حسب راحتك.",
      },
      {
        questionAr: "هل يعمل على الكتف والظهر أيضاً؟",
        answerAr: "نعم، يمكن استخدامه على الكتف وأعلى الظهر لإرخاء العضلات المشدودة.",
      },
    ],
    badge: "الأكثر طلباً",
    role: "addon",
  },
];

export const productsBySlug = Object.fromEntries(products.map((p) => [p.slug, p]));
export const productsBySku = Object.fromEntries(products.map((p) => [p.sku, p]));

export const heroProducts = products.filter((p) => p.role !== "addon");
export const addonProducts = products.filter((p) => p.role === "addon");

/**
 * Cross-sells for cart & product pages.
 * Prioritizes cheap different-problem ADD-ONS first (they lift AOV via impulse),
 * then heroes. Excludes anything already in the cart.
 */
export function getCrossSells(cartSkus: string[], limit = 4): Product[] {
  const rank = (p: Product) => (p.role === "addon" ? 0 : 1);
  return products
    .filter((p) => !cartSkus.includes(p.sku))
    .sort((a, b) => rank(a) - rank(b))
    .slice(0, limit);
}

/**
 * One-Time-Offer (post-checkout upsell).
 * Always tries to attach a cheap, high-impulse ADD-ON (different problem) at a
 * discount — this is where AOV is won. Falls back to any hero not in cart.
 */
export function getOTOProduct(cartSkus: string[]): Product | null {
  const otoPriority = [
    "joint-relief-gel",
    "neck-shoulder-massager",
    "back-support-belt",
    "posture-corrector",
  ];
  for (const sku of otoPriority) {
    if (!cartSkus.includes(sku) && productsBySku[sku]) return productsBySku[sku];
  }
  const fallbackHero = products.find((p) => !cartSkus.includes(p.sku));
  return fallbackHero ?? productsBySku["joint-relief-gel"] ?? null;
}
