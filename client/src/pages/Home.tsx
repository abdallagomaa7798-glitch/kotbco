import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import {
  ArrowLeft,
  ArrowUpLeft,
  Building2,
  Check,
  ChevronLeft,
  Clock3,
  Compass,
  Facebook,
  Hammer,
  Heart,
  Instagram,
  Layers3,
  Music2,
  Mail,
  MapPin,
  MessageCircle,
  Menu,
  PenTool,
  Phone,
  PlayCircle,
  Ruler,
  Scale,
  Share2,
  ShieldCheck,
  Sparkles,
  X,
  Youtube,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
import type { LibraryVideo } from "../../../server/videoLibrary";

type Language = "ar" | "en" | "fr";
const languageLabels: Record<Language, string> = { ar: "العربية", en: "English", fr: "Français" };
const translations: Record<Language, Record<string, string>> = {
  ar: {},
  en: {
    "عن قطب": "About Kotb", "خدماتنا": "Services", "مشاريعنا": "Projects", "مكتبة الفيديو": "Video Library", "تواصل معنا": "Contact us", "شركة بناء وتشطيبات مصرية": "Egyptian construction & finishing company", "نبني ما يستحق": "We build what is worth", "أن يُعاش.": "living in.", "نصنع مساحات تنتمي إليك داخل مصر — من الفكرة الأولى إلى آخر لمسة، بجودة تُرى وتفاصيل تُحس.": "We create spaces that belong to you in Egypt — from the first idea to the final touch, with visible quality and felt detail.", "ابدأ مشروعك معنا": "Start your project", "استكشف أعمالنا": "Explore our work", "الإسكندرية · مصر": "Alexandria · Egypt · Nationwide and global soon", "اكتشف أكثر": "Discover more", "نبني بثقة": "Built with confidence", "عاماً من الخبرة": "years of experience", "مشروعاً منجزاً": "completed projects", "التزام بالمواعيد": "on-time commitment", "نبني بثقة. نُنجز بضمير.": "We build with confidence. We deliver with integrity.", "وجهة واحدة لكل تفاصيل البناء": "One destination for every construction detail", "نؤمن أن": "We believe", "الجودة": "quality", "أسلوب.": "is a way of life.", "يجمع فريقنا بين خبرة التنفيذ وحسّ التصميم، لنمنحك رحلة أكثر وضوحاً ونتيجة أكثر اتساقاً. لأن التفاصيل الصغيرة هي التي تصنع الفرق الكبير.": "Our team combines execution expertise with a design sensibility to give you a clearer journey and a more coherent result. Because small details make the biggest difference.", "نغطي محافظة الإسكندرية بالكامل، وقريباً نصل إلى كل أنحاء الجمهورية والعالم.": "We cover all of Alexandria Governorate, with nationwide and global reach coming soon.", "لماذا تختار KOTB CONSTRUCTION؟": "Why choose KOTB CONSTRUCTION?", "إشراف هندسي مباشر": "Direct engineering supervision", "مقايسات وكميات دقيقة": "Accurate quantities and estimates", "متابعة مراحل التنفيذ": "Execution-stage follow-up", "اختيار الخامات بعناية": "Carefully selected materials", "شفافية في التكلفة": "Cost transparency", "تقارير ومتابعة للعميل": "Client reports and updates", "حلول تناسب الميزانية": "Solutions for your budget", "التزام بمعايير التنفيذ": "Commitment to execution standards", "تعرّف على طريقتنا": "Discover our approach", "ماذا نقدم": "What we offer", "من الأساس": "From foundation", "إلى الإحساس.": "to feeling.", "أفكار واتجاهات": "Ideas & directions", "تصاميم": "Designs", "تتكلم.": "that speak.", "من مواقعنا": "From our sites", "شغلنا": "Our work", "على الطبيعة.": "in real life.", "مكتبة قطب": "Kotb library", "شاهد أعمالنا": "See our work", "من مكان واحد.": "in one place.", "كيف نعمل": "How we work", "خطوات واضحة.": "Clear steps.", "نتيجة واثقة.": "Confident results.", "لنبنِ معاً": "Let us build together", "لديك فكرة؟": "Have an idea?", "نحن نسمع.": "We are listening.", "إرسال الطلب": "Send request", "الاسم الكامل": "Full name", "رقم الجوال": "Mobile number", "نوع المشروع": "Project type", "حدثنا عن مشروعك": "Tell us about your project", "اختر نوع المشروع": "Choose project type", "بناء منزل": "House construction", "تشطيب وتجديد": "Finishing & renovation", "تصميم داخلي": "Interior design", "مشروع تجاري": "Commercial project", "معلوماتك بأمان، ولن تستخدم إلا للتواصل بشأن طلبك.": "Your information is safe and will only be used to contact you about your request.", "زيارة صفحتنا على فيسبوك": "Visit our Facebook page", "مشاهدة داخل الموقع": "Watch inside the website", "زيارة الحساب بعد الربط": "Visit account after connection", "اكتشف قصة المشروع": "Discover the project story", "ناقش فكرتك معنا": "Discuss your idea", "إغلاق": "Close"
  },
  fr: {
    "عن قطب": "À propos de Kotb", "خدماتنا": "Services", "مشاريعنا": "Projets", "مكتبة الفيديو": "Bibliothèque vidéo", "تواصل معنا": "Contactez-nous", "شركة بناء وتشطيبات مصرية": "Entreprise égyptienne de construction et finition", "نبني ما يستحق": "Nous construisons ce qui mérite", "أن يُعاش.": "d’être vécu.", "نصنع مساحات تنتمي إليك داخل مصر — من الفكرة الأولى إلى آخر لمسة، بجودة تُرى وتفاصيل تُحس.": "Nous créons en Égypte des espaces qui vous ressemblent — de la première idée à la dernière touche, avec une qualité visible et des détails ressentis.", "ابدأ مشروعك معنا": "Démarrer votre projet", "استكشف أعمالنا": "Découvrir nos réalisations", "الإسكندرية · مصر": "Alexandrie · Égypte · Bientôt partout en Égypte et dans le monde", "اكتشف أكثر": "En savoir plus", "نبني بثقة": "Construire avec confiance", "عاماً من الخبرة": "ans d’expérience", "مشروعاً منجزاً": "projets réalisés", "التزام بالمواعيد": "respect des délais", "نبني بثقة. نُنجز بضمير.": "Nous construisons avec confiance et intégrité.", "وجهة واحدة لكل تفاصيل البناء": "Une seule destination pour chaque détail de construction", "نؤمن أن": "Nous croyons que", "الجودة": "la qualité", "أسلوب.": "est un mode de vie.", "يجمع فريقنا بين خبرة التنفيذ وحسّ التصميم، لنمنحك رحلة أكثر وضوحاً ونتيجة أكثر اتساقاً. لأن التفاصيل الصغيرة هي التي تصنع الفرق الكبير.": "Notre équipe associe expertise d’exécution et sens du design pour vous offrir un parcours plus clair et un résultat cohérent. Les petits détails font la grande différence.", "نغطي محافظة الإسكندرية بالكامل، وقريباً نصل إلى كل أنحاء الجمهورية والعالم.": "Nous couvrons toute la région d’Alexandrie, avec une présence nationale et internationale prochainement.", "لماذا تختار KOTB CONSTRUCTION؟": "Pourquoi choisir KOTB CONSTRUCTION ?", "إشراف هندسي مباشر": "Supervision technique directe", "مقايسات وكميات دقيقة": "Métrés et quantités précis", "متابعة مراحل التنفيذ": "Suivi des étapes d’exécution", "اختيار الخامات بعناية": "Matériaux soigneusement sélectionnés", "شفافية في التكلفة": "Transparence des coûts", "تقارير ومتابعة للعميل": "Rapports et suivi client", "حلول تناسب الميزانية": "Solutions adaptées au budget", "التزام بمعايير التنفيذ": "Respect des standards d’exécution", "تعرّف على طريقتنا": "Découvrir notre méthode", "ماذا نقدم": "Nos services", "من الأساس": "Des fondations", "إلى الإحساس.": "à l’émotion.", "أفكار واتجاهات": "Idées & directions", "تصاميم": "Des designs", "تتكلم.": "qui parlent.", "من مواقعنا": "Sur nos chantiers", "شغلنا": "Notre travail", "على الطبيعة.": "en réalité.", "مكتبة قطب": "Bibliothèque Kotb", "شاهد أعمالنا": "Voir nos réalisations", "من مكان واحد.": "au même endroit.", "كيف نعمل": "Notre méthode", "خطوات واضحة.": "Des étapes claires.", "نتيجة واثقة.": "Un résultat sûr.", "لنبنِ معاً": "Construisons ensemble", "لديك فكرة؟": "Une idée ?", "نحن نسمع.": "Nous vous écoutons.", "إرسال الطلب": "Envoyer la demande", "الاسم الكامل": "Nom complet", "رقم الجوال": "Téléphone", "نوع المشروع": "Type de projet", "حدثنا عن مشروعك": "Parlez-nous de votre projet", "اختر نوع المشروع": "Choisir le type de projet", "بناء منزل": "Construction de maison", "تشطيب وتجديد": "Finition et rénovation", "تصميم داخلي": "Design intérieur", "مشروع تجاري": "Projet commercial", "معلوماتك بأمان، ولن تستخدم إلا للتواصل بشأن طلبك.": "Vos informations sont sécurisées et utilisées uniquement pour vous contacter.", "زيارة صفحتنا على فيسبوك": "Visiter notre page Facebook", "مشاهدة داخل الموقع": "Regarder sur le site", "زيارة الحساب بعد الربط": "Visiter le compte", "اكتشف قصة المشروع": "Découvrir l’histoire du projet", "ناقش فكرتك معنا": "Discuter de votre idée", "إغلاق": "Fermer"
  }
};

Object.assign(translations.en, { "البناء والتشييد": "Construction", "التصميم الداخلي": "Interior design", "التشطيبات المتخصصة": "Specialized finishing", "من القواعد الأولى حتى التسليم، ندير كل تفصيلة في مشروعك بمعايير تنفيذ دقيقة.": "From the first foundation to handover, we manage every detail with precise execution standards.", "نحوّل احتياجك إلى فراغ متوازن يجمع بين الشخصية، الوظيفة، وجمال التفاصيل.": "We turn your needs into balanced spaces combining character, function and beauty.", "مواد منتقاة وحرفيون محترفون ليبقى أثر الجودة واضحاً في كل سطح وملمس.": "Selected materials and skilled craftspeople make quality visible in every surface and texture.", "تصورات سكنية": "Residential concepts", "أفكار داخلية": "Interior ideas", "أفكار تجارية": "Commercial ideas", "نستمع": "We listen", "نخطط": "We plan", "نبني": "We build", "نسلّم": "We hand over", "نفهم رؤيتك، أسلوب حياتك، وما تريد أن تشعر به في المكان.": "We understand your vision, lifestyle and how you want the space to feel.", "نحوّل الطموح إلى نطاق عمل واضح، ميزانية منضبطة، وجدول واقعي.": "We turn ambition into a clear scope, disciplined budget and realistic schedule.", "فريق واحد يتابع كل قرار وتنفيذ حتى أدق لمسة في الموقع.": "One team follows every decision and execution detail on site.", "مساحة جاهزة للحياة، مع عناية ما بعد التسليم وراحة بالك.": "A space ready for life, with aftercare and peace of mind." });
Object.assign(translations.fr, { "البناء والتشييد": "Construction", "التصميم الداخلي": "Design intérieur", "التشطيبات المتخصصة": "Finitions spécialisées", "من القواعد الأولى حتى التسليم، ندير كل تفصيلة في مشروعك بمعايير تنفيذ دقيقة.": "Des fondations à la livraison, nous gérons chaque détail avec précision.", "نحوّل احتياجك إلى فراغ متوازن يجمع بين الشخصية، الوظيفة، وجمال التفاصيل.": "Nous transformons vos besoins en espaces équilibrés, fonctionnels et singuliers.", "مواد منتقاة وحرفيون محترفون ليبقى أثر الجودة واضحاً في كل سطح وملمس.": "Des matériaux choisis et des artisans qualifiés pour une qualité visible.", "تصورات سكنية": "Concepts résidentiels", "أفكار داخلية": "Idées intérieures", "أفكار تجارية": "Idées commerciales", "نستمع": "Nous écoutons", "نخطط": "Nous planifions", "نبني": "Nous construisons", "نسلّم": "Nous livrons", "نفهم رؤيتك، أسلوب حياتك، وما تريد أن تشعر به في المكان.": "Nous comprenons votre vision, votre mode de vie et l’émotion recherchée.", "نحوّل الطموح إلى نطاق عمل واضح، ميزانية منضبطة، وجدول واقعي.": "Nous transformons l’ambition en périmètre clair, budget maîtrisé et calendrier réaliste.", "فريق واحد يتابع كل قرار وتنفيذ حتى أدق لمسة في الموقع.": "Une équipe suit chaque décision et chaque détail sur site.", "مساحة جاهزة للحياة، مع عناية ما بعد التسليم وراحة بالك.": "Un espace prêt à vivre, avec un suivi après livraison." });
Object.assign(translations.en, { "في قطب، لا نتعامل مع البناء كمراحل منفصلة. نحن نرى المشروع كقصة واحدة — تبدأ من طموحك، وتكبر مع كل قرار مدروس، وتنتهي بمكان يشبهك تماماً.": "At Kotb, we do not treat construction as separate stages. We see every project as one story — starting with your ambition and ending in a place that feels like you.", "نموذج توضيحي · تنفيذ وتشطيبات": "Illustrative concept · Construction & finishing", "نموذج توضيحي · تصميم داخلي": "Illustrative concept · Interior design", "نموذج توضيحي · مساحات تجارية": "Illustrative concept · Commercial spaces", "صورة توضيحية لأسلوب البناء والتشطيبات السكنية، وليست مشروعاً منفذاً من قطب.": "An illustrative reference for residential construction and finishing, not a completed Kotb project.", "مرجع بصري لاختيارات الخامات والتفاصيل الداخلية التي يمكن تطويرها حسب كل مشروع.": "A visual reference for materials and interior details that can be tailored to each project.", "تصور بصري لمساحة تجارية عملية، يُستخدم للإلهام وتحديد الاتجاه قبل بدء التصميم.": "A visual concept for a practical commercial space, used to set direction before design begins." });
Object.assign(translations.fr, { "في قطب، لا نتعامل مع البناء كمراحل منفصلة. نحن نرى المشروع كقصة واحدة — تبدأ من طموحك، وتكبر مع كل قرار مدروس، وتنتهي بمكان يشبهك تماماً.": "Chez Kotb, la construction n’est pas une suite d’étapes séparées. Chaque projet est une histoire qui commence par votre ambition et se termine dans un lieu qui vous ressemble.", "نموذج توضيحي · تنفيذ وتشطيبات": "Concept illustratif · Construction et finition", "نموذج توضيحي · تصميم داخلي": "Concept illustratif · Design intérieur", "نموذج توضيحي · مساحات تجارية": "Concept illustratif · Espaces commerciaux", "صورة توضيحية لأسلوب البناء والتشطيبات السكنية، وليست مشروعاً منفذاً من قطب.": "Référence visuelle pour la construction résidentielle, et non un projet réalisé par Kotb.", "مرجع بصري لاختيارات الخامات والتفاصيل الداخلية التي يمكن تطويرها حسب كل مشروع.": "Référence visuelle pour les matériaux et détails intérieurs, adaptable à chaque projet.", "تصور بصري لمساحة تجارية عملية، يُستخدم للإلهام وتحديد الاتجاه قبل بدء التصميم.": "Concept visuel d’un espace commercial pratique pour définir la direction du projet." });

const services = [
  {
    number: "01",
    icon: Building2,
    title: "البناء والتشييد",
    text: "من القواعد الأولى حتى التسليم، ندير كل تفصيلة في مشروعك بمعايير تنفيذ دقيقة.",
  },
  {
    number: "02",
    icon: PenTool,
    title: "التصميم الداخلي",
    text: "نحوّل احتياجك إلى فراغ متوازن يجمع بين الشخصية، الوظيفة، وجمال التفاصيل.",
  },
  {
    number: "03",
    icon: Layers3,
    title: "التشطيبات المتخصصة",
    text: "مواد منتقاة وحرفيون محترفون ليبقى أثر الجودة واضحاً في كل سطح وملمس.",
  },
];

const projects = [
  {
    category: "نموذج توضيحي · تنفيذ وتشطيبات",
    title: "تصورات سكنية",
    image: "/images/qutb-villa_cb531b1c.jpg",
    description: "صورة توضيحية لأسلوب البناء والتشطيبات السكنية، وليست مشروعاً منفذاً من قطب.",
  },
  {
    category: "نموذج توضيحي · تصميم داخلي",
    title: "أفكار داخلية",
    image: "/images/qutb-interior_3123fb93.jpg",
    description: "مرجع بصري لاختيارات الخامات والتفاصيل الداخلية التي يمكن تطويرها حسب كل مشروع.",
  },
  {
    category: "نموذج توضيحي · مساحات تجارية",
    title: "أفكار تجارية",
    image: "/images/qutb-office_cb3f192c.jpg",
    description: "تصور بصري لمساحة تجارية عملية، يُستخدم للإلهام وتحديد الاتجاه قبل بدء التصميم.",
  },
];

const designCategories = ["الكل", "مطابخ", "غرف", "حمامات", "غرف أطفال", "استقبال", "تصميمات خارجية", "حدائق", "إدارية", "تجارية", "مكتبية"];
const designStyles = ["مودرن", "كلاسيك", "بوهيمي", "اسكندنافي", "نيو كلاسيك", "صناعي", "هادئ", "فاخر"];
const designPalettes = ["رملي وذهبي", "أبيض وفحمي", "أخضر زيتوني", "طوبي ودافئ", "أزرق رمادي", "بيج طبيعي", "أسود ولمسة نحاس", "ألوان ترابية", "أبيض وخشب", "رمادي رخامي", "وردي هادئ", "أخضر مريمي", "أزرق ليلي", "ذهبي عاجي"];
const designImagePools: Record<string, string[]> = {
  "مطابخ": ["/images/qutb-design-kitchens-modern_7934d5ce.jpg", "/images/qutb-design-kitchen-classic_e7681149.jpg", "/images/qutb-design-kitchen-bohemian_fadb914b.jpg", "/images/qutb-design-kitchen-minimal_fd031b74.jpg", "/images/qutb-design-kitchen-terracotta_a05585bc.jpg", "/images/qutb-design-kitchen-industrial_92367bec.jpg"],
  "غرف": ["/images/qutb-design-bedroom-scandi_fc0e806f.jpg", "/images/qutb-design-living-modern_28f78080.jpg", "/images/qutb-design-bedroom-classic_983e26c1.jpg", "/images/qutb-design-bedroom-wabisabi_536494e5.jpg"],
  "حمامات": ["/images/qutb-design-bathroom-classic_dae773ad.jpg", "/images/qutb-design-bathroom-modern_04e00f2f.jpg", "/images/qutb-design-bathroom-neoclassical_d4e7d4c7.jpg", "/images/qutb-design-bathroom-japandi_a7d7add5.jpg"],
  "غرف أطفال": ["/images/qutb-design-kids-room_1a71c12b.jpg", "/images/qutb-design-kids-room-scandi_9c604760.jpg"],
  "استقبال": ["/images/qutb-design-reception-boho_7fe8e6ea.jpg", "/images/qutb-design-living-modern_28f78080.jpg", "/images/qutb-design-reception-modern_94ce6ffe.jpg", "/images/qutb-design-reception-neoclassical_052cef99.jpg"],
  "تصميمات خارجية": ["/images/qutb-design-exterior-modern_b6a81ea1.jpg", "/images/qutb-design-exterior-classic_a2d429b9.jpg", "/images/qutb-design-exterior-evening_aa84dca8.jpg", "/images/qutb-design-exterior-courtyard_2fcefb41.jpg"],
  "حدائق": ["/images/qutb-design-garden-modern_71daf6cd.jpg", "/images/qutb-design-garden-boho_49894b22.jpg", "/images/qutb-design-garden-mediterranean_ad27f27c.jpg", "/images/qutb-design-garden-zen_58b09607.jpg"],
  "إدارية": ["/images/qutb-design-office-contemporary_4dd4794d.jpg", "/images/qutb-design-office-industrial_329eefed.jpg", "/images/qutb-design-office-lounge_ff1d99e9.jpg", "/images/qutb-design-admin-boardroom_b7630ea0.jpg", "/images/qutb-design-office-creative_fa91068a.jpg"],
  "تجارية": ["/images/qutb-design-retail_0b4b37cc.jpg", "/images/qutb-design-retail-luxury_26d956d6.jpg", "/images/qutb-design-cafe-contemporary_afc3a7b2.jpg", "/images/qutb-design-retail-jewelry_7fbf56a0.jpg"],
  "مكتبية": ["/images/qutb-design-office-contemporary_4dd4794d.jpg", "/images/qutb-design-office-industrial_329eefed.jpg", "/images/qutb-design-office-lounge_ff1d99e9.jpg", "/images/qutb-design-office-creative_fa91068a.jpg"],
};
const designCategoryNotes: Record<string, string> = {
  "مطابخ": "توزيع عملي للحركة والتخزين مع خامات وتشطيبات تناسب الاستخدام اليومي.", "غرف": "تكوين متوازن للراحة والإضاءة والخامات، مع شخصية واضحة لكل أسلوب.", "حمامات": "حلول سبا منزلية توازن بين مقاومة الرطوبة، سهولة الصيانة، وفخامة التفاصيل.", "غرف أطفال": "مساحة آمنة ومرنة تجمع النوم والتخزين والتعلم في تكوين قابل للتطور.", "استقبال": "فراغ اجتماعي مميز يضبط النسب ومسارات الحركة ويصنع انطباعاً أولاً قوياً.", "تصميمات خارجية": "واجهات ومداخل تضبط الكتلة والظل والإضاءة بما يناسب العمارة المصرية الحديثة.", "حدائق": "تخطيط خارجي يدمج النباتات والجلسات والماء في تجربة متماسكة طوال اليوم.", "إدارية": "بيئة عمل احترافية تحسن التركيز والخصوصية وتدعم هوية المؤسسة.", "تجارية": "مسارات عرض وحركة مدروسة لتحويل المساحة التجارية إلى تجربة واضحة وجاذبة.", "مكتبية": "مكاتب تنفيذية وعمل جماعي بخامات راقية وإضاءة مريحة وسيناريوهات استخدام متعددة.",
};
const designCategoryLabels: Record<Language, Record<string, string>> = {
  ar: Object.fromEntries(designCategories.map((category) => [category, category])),
  en: { "الكل": "All", "مطابخ": "Kitchens", "غرف": "Rooms", "حمامات": "Bathrooms", "غرف أطفال": "Children’s rooms", "استقبال": "Reception", "تصميمات خارجية": "Exteriors", "حدائق": "Gardens", "إدارية": "Administrative", "تجارية": "Commercial", "مكتبية": "Office" },
  fr: { "الكل": "Tout", "مطابخ": "Cuisines", "غرف": "Pièces de vie", "حمامات": "Salles de bains", "غرف أطفال": "Chambres d’enfants", "استقبال": "Réception", "تصميمات خارجية": "Extérieurs", "حدائق": "Jardins", "إدارية": "Administratif", "تجارية": "Commercial", "مكتبية": "Bureaux" },
};
const designStyleLabels: Record<Language, Record<string, string>> = {
  ar: { "مودرن": "مودرن", "كلاسيك": "كلاسيك", "بوهيمي": "بوهيمي", "اسكندنافي": "اسكندنافي", "نيو كلاسيك": "نيو كلاسيك", "صناعي": "صناعي", "هادئ": "هادئ", "فاخر": "فاخر" },
  en: { "مودرن": "Modern", "كلاسيك": "Classic", "بوهيمي": "Bohemian", "اسكندنافي": "Scandinavian", "نيو كلاسيك": "Neoclassical", "صناعي": "Industrial", "هادئ": "Calm", "فاخر": "Luxury" },
  fr: { "مودرن": "Moderne", "كلاسيك": "Classique", "بوهيمي": "Bohème", "اسكندنافي": "Scandinave", "نيو كلاسيك": "Néoclassique", "صناعي": "Industriel", "هادئ": "Apaisé", "فاخر": "Luxe" },
};
const designPaletteLabels: Record<Language, Record<string, string>> = {
  ar: Object.fromEntries(designPalettes.map((palette) => [palette, palette])),
  en: { "رملي وذهبي": "Sand & gold", "أبيض وفحمي": "White & charcoal", "أخضر زيتوني": "Olive green", "طوبي ودافئ": "Warm terracotta", "أزرق رمادي": "Blue grey", "بيج طبيعي": "Natural beige", "أسود ولمسة نحاس": "Black & copper", "ألوان ترابية": "Earth tones", "أبيض وخشب": "White & wood", "رمادي رخامي": "Marble grey", "وردي هادئ": "Soft blush", "أخضر مريمي": "Sage green", "أزرق ليلي": "Night blue", "ذهبي عاجي": "Ivory gold" },
  fr: { "رملي وذهبي": "Sable et or", "أبيض وفحمي": "Blanc et charbon", "أخضر زيتوني": "Vert olive", "طوبي ودافئ": "Terracotta chaleureux", "أزرق رمادي": "Bleu gris", "بيج طبيعي": "Beige naturel", "أسود ولمسة نحاس": "Noir et cuivre", "ألوان ترابية": "Tons terre", "أبيض وخشب": "Blanc et bois", "رمادي رخامي": "Gris marbre", "وردي هادئ": "Rose poudré", "أخضر مريمي": "Vert sauge", "أزرق ليلي": "Bleu nuit", "ذهبي عاجي": "Or ivoire" },
};
const designNoteTranslations: Record<Language, Record<string, string>> = {
  ar: designCategoryNotes,
  en: { "مطابخ": "Practical movement and storage planning with finishes made for everyday use.", "غرف": "A balanced composition for comfort, light and materials, with a clear design character.", "حمامات": "A home-spa solution balancing moisture resistance, easy maintenance and refined detail.", "غرف أطفال": "A safe, flexible room combining sleep, storage and learning in an adaptable layout.", "استقبال": "A distinctive social space with considered proportions and circulation for a strong first impression.", "تصميمات خارجية": "Facades and entrances shaped through massing, shade and lighting for contemporary Egyptian architecture.", "حدائق": "Landscape planning that brings planting, seating and water into one all-day experience.", "إدارية": "A professional workplace that supports focus, privacy and institutional identity.", "تجارية": "Considered display and circulation paths that turn retail space into a clear, engaging experience.", "مكتبية": "Executive and collaborative offices with refined materials, comfortable lighting and flexible use scenarios." },
  fr: { "مطابخ": "Une organisation pratique des circulations et du rangement, pensée pour le quotidien.", "غرف": "Une composition équilibrée pour le confort, la lumière et les matières, avec une identité claire.", "حمامات": "Une ambiance spa qui équilibre résistance à l’humidité, entretien facile et détails raffinés.", "غرف أطفال": "Une chambre sûre et évolutive réunissant sommeil, rangement et apprentissage.", "استقبال": "Un espace social distinctif aux proportions et circulations étudiées pour une première impression forte.", "تصميمات خارجية": "Des façades et entrées composées par les volumes, l’ombre et la lumière pour une architecture égyptienne contemporaine.", "حدائق": "Un aménagement paysager qui réunit végétation, assises et eau dans une expérience harmonieuse.", "إدارية": "Un environnement professionnel qui favorise concentration, confidentialité et identité institutionnelle.", "تجارية": "Des parcours d’exposition et de circulation pensés pour une expérience commerciale claire et attractive.", "مكتبية": "Des bureaux de direction et collaboratifs aux matières raffinées et à l’éclairage confortable." },
};
const detailLabels: Record<Language, { materials: string; colors: string; use: string; close: string; view: string }> = {
  ar: { materials: "الخامات المقترحة", colors: "اللوحة اللونية", use: "الاستخدام المقترح", close: "إغلاق", view: "عرض التفاصيل" },
  en: { materials: "Suggested materials", colors: "Color palette", use: "Recommended use", close: "Close", view: "View details" },
  fr: { materials: "Matériaux suggérés", colors: "Palette chromatique", use: "Usage recommandé", close: "Fermer", view: "Voir les détails" },
};
const designMaterials: Record<Language, Record<string, string>> = {
  ar: { "مطابخ": "رخام طبيعي، خشب معالج، وإكسسوارات معدنية مقاومة للاستخدام اليومي.", "غرف": "خشب طبيعي، أقمشة كتانية، ودهانات مطفية مريحة للعين.", "حمامات": "رخام وبورسلان كبير المقاس، زجاج مقسى، وخلاطات عالية الجودة.", "غرف أطفال": "دهانات منخفضة المركبات، خشب بحواف آمنة، وأقمشة سهلة التنظيف.", "استقبال": "حجر طبيعي، نجارة تفصيلية، أقمشة فاخرة، وإضاءة طبقية.", "تصميمات خارجية": "حجر واجهات، خشب خارجي، معدن مطلي، وإضاءة مقاومة للعوامل الجوية.", "حدائق": "حجر طبيعي، أخشاب خارجية، نباتات متوسطية، وأنظمة ري وإضاءة مخفية.", "إدارية": "ألواح خشبية، زجاج، أسقف صوتية، وأرضيات عملية عالية التحمل.", "تجارية": "حوائط عرض متينة، معدن، زجاج، وأرضيات تتحمل كثافة الحركة.", "مكتبية": "قواطع زجاجية، خشب طبيعي، ألواح امتصاص صوت، وأثاث مريح." },
  en: { "مطابخ": "Natural stone, treated timber and durable metal hardware for everyday use.", "غرف": "Natural wood, linen textiles and calm matte finishes for restorative comfort.", "حمامات": "Large-format marble and porcelain, tempered glass and premium fittings.", "غرف أطفال": "Low-VOC finishes, rounded timber details and easy-clean textiles.", "استقبال": "Natural stone, bespoke joinery, refined upholstery and layered lighting.", "تصميمات خارجية": "Facade stone, exterior timber, coated metal and weather-resistant lighting.", "حدائق": "Natural stone, exterior timber, Mediterranean planting, concealed irrigation and lighting.", "إدارية": "Timber panels, glass, acoustic ceilings and durable practical flooring.", "تجارية": "Durable display walls, metal, glass and flooring designed for high footfall.", "مكتبية": "Glass partitions, natural timber, acoustic panels and ergonomic furniture." },
  fr: { "مطابخ": "Pierre naturelle, bois traité et quincaillerie métallique durable pour le quotidien.", "غرف": "Bois naturel, textiles en lin et finitions mates apaisantes.", "حمامات": "Marbre et grès grand format, verre trempé et robinetterie premium.", "غرف أطفال": "Finitions faibles en COV, bois aux angles doux et textiles faciles à nettoyer.", "استقبال": "Pierre naturelle, menuiserie sur mesure, tissus raffinés et éclairage en couches.", "تصميمات خارجية": "Pierre de façade, bois extérieur, métal traité et éclairage résistant.", "حدائق": "Pierre naturelle, bois extérieur, végétation méditerranéenne, arrosage et lumière intégrés.", "إدارية": "Panneaux bois, verre, plafonds acoustiques et sols durables.", "تجارية": "Murs d’exposition robustes, métal, verre et sols adaptés au fort passage.", "مكتبية": "Cloisons vitrées, bois naturel, panneaux acoustiques et mobilier ergonomique." },
};
const designUses: Record<Language, Record<string, string>> = {
  ar: { "مطابخ": "مطبخ عائلي أو مطبخ مفتوح متصل بمنطقة الطعام.", "غرف": "غرفة نوم رئيسية أو غرفة معيشة هادئة.", "حمامات": "حمام رئيسي فاخر أو حمام ضيوف عملي.", "غرف أطفال": "غرفة طفل قابلة للتطور مع منطقة مذاكرة.", "استقبال": "مجلس عائلي أو صالة استقبال للضيوف.", "تصميمات خارجية": "واجهة فيلا، مدخل رئيسي، أو فناء خارجي.", "حدائق": "حديقة فيلا، جلسة خارجية، أو فناء داخلي.", "إدارية": "مقر شركة، مكتب إدارة، أو مساحة اجتماعات.", "تجارية": "متجر، صالة عرض، أو مساحة استقبال تجارية.", "مكتبية": "مكتب تنفيذي، مساحة عمل مشتركة، أو صالة تعاون." },
  en: { "مطابخ": "A family kitchen or open-plan kitchen connected to dining.", "غرف": "A master bedroom or a calm living room.", "حمامات": "A luxury primary bathroom or practical guest bathroom.", "غرف أطفال": "An adaptable child’s room with a dedicated study zone.", "استقبال": "A family majlis or a welcoming guest reception lounge.", "تصميمات خارجية": "A villa facade, main entrance or outdoor courtyard.", "حدائق": "A villa garden, outdoor seating area or inner courtyard.", "إدارية": "A company headquarters, management office or meeting space.", "تجارية": "A retail store, showroom or commercial welcome area.", "مكتبية": "An executive office, coworking area or collaboration lounge." },
  fr: { "مطابخ": "Une cuisine familiale ou ouverte sur la salle à manger.", "غرف": "Une suite parentale ou un salon apaisant.", "حمامات": "Une salle de bains principale luxueuse ou une salle d’eau d’accueil.", "غرف أطفال": "Une chambre d’enfant évolutive avec zone d’étude.", "استقبال": "Un majlis familial ou un salon d’accueil chaleureux.", "تصميمات خارجية": "Une façade de villa, une entrée principale ou une cour extérieure.", "حدائق": "Un jardin de villa, une terrasse ou une cour intérieure.", "إدارية": "Un siège d’entreprise, un bureau de direction ou une salle de réunion.", "تجارية": "Un magasin, un showroom ou un espace d’accueil commercial.", "مكتبية": "Un bureau de direction, un espace partagé ou un lounge collaboratif." },
};
const designCatalog: Array<{ id: number; category: string; style: string; palette: string; image: string; title: string; description: string }> = [
  ["مطابخ", "مودرن", "أبيض وخشب", "/images/qutb-design-kitchens-modern_7934d5ce.jpg"], ["مطابخ", "كلاسيك", "رملي وذهبي", "/images/qutb-design-kitchen-classic_e7681149.jpg"], ["مطابخ", "بوهيمي", "ألوان ترابية", "/images/qutb-design-kitchen-bohemian_fadb914b.jpg"], ["مطابخ", "هادئ", "بيج طبيعي", "/images/qutb-design-kitchen-minimal_fd031b74.jpg"], ["مطابخ", "فاخر", "طوبي ودافئ", "/images/qutb-design-kitchen-terracotta_a05585bc.jpg"], ["مطابخ", "صناعي", "أسود ولمسة نحاس", "/images/qutb-design-kitchen-industrial_92367bec.jpg"],
  ["غرف", "اسكندنافي", "أبيض وخشب", "/images/qutb-design-bedroom-scandi_fc0e806f.jpg"], ["غرف", "مودرن", "أزرق رمادي", "/images/qutb-design-living-modern_28f78080.jpg"], ["غرف", "كلاسيك", "رملي وذهبي", "/images/qutb-design-bedroom-classic_983e26c1.jpg"], ["غرف", "هادئ", "ألوان ترابية", "/images/qutb-design-bedroom-wabisabi_536494e5.jpg"],
  ["حمامات", "كلاسيك", "رمادي رخامي", "/images/qutb-design-bathroom-classic_dae773ad.jpg"], ["حمامات", "مودرن", "أبيض وفحمي", "/images/qutb-design-bathroom-modern_04e00f2f.jpg"], ["حمامات", "نيو كلاسيك", "ذهبي عاجي", "/images/qutb-design-bathroom-neoclassical_d4e7d4c7.jpg"], ["حمامات", "هادئ", "بيج طبيعي", "/images/qutb-design-bathroom-japandi_a7d7add5.jpg"],
  ["غرف أطفال", "اسكندنافي", "أخضر مريمي", "/images/qutb-design-kids-room-scandi_9c604760.jpg"], ["غرف أطفال", "مودرن", "أزرق رمادي", "/images/qutb-design-kids-room_1a71c12b.jpg"],
  ["استقبال", "بوهيمي", "ألوان ترابية", "/images/qutb-design-reception-boho_7fe8e6ea.jpg"], ["استقبال", "مودرن", "بيج طبيعي", "/images/qutb-design-reception-modern_94ce6ffe.jpg"], ["استقبال", "نيو كلاسيك", "ذهبي عاجي", "/images/qutb-design-reception-neoclassical_052cef99.jpg"],
  ["تصميمات خارجية", "مودرن", "أبيض وفحمي", "/images/qutb-design-exterior-modern_b6a81ea1.jpg"], ["تصميمات خارجية", "كلاسيك", "رملي وذهبي", "/images/qutb-design-exterior-classic_a2d429b9.jpg"], ["تصميمات خارجية", "فاخر", "أزرق ليلي", "/images/qutb-design-exterior-evening_aa84dca8.jpg"], ["تصميمات خارجية", "مودرن", "بيج طبيعي", "/images/qutb-design-exterior-courtyard_2fcefb41.jpg"],
  ["حدائق", "مودرن", "أخضر زيتوني", "/images/qutb-design-garden-modern_71daf6cd.jpg"], ["حدائق", "بوهيمي", "ألوان ترابية", "/images/qutb-design-garden-boho_49894b22.jpg"], ["حدائق", "هادئ", "أخضر زيتوني", "/images/qutb-design-garden-mediterranean_ad27f27c.jpg"], ["حدائق", "اسكندنافي", "أبيض وفحمي", "/images/qutb-design-garden-zen_58b09607.jpg"],
  ["إدارية", "مودرن", "أبيض وفحمي", "/images/qutb-design-office-contemporary_4dd4794d.jpg"], ["إدارية", "صناعي", "أسود ولمسة نحاس", "/images/qutb-design-office-industrial_329eefed.jpg"], ["إدارية", "فاخر", "رمادي رخامي", "/images/qutb-design-admin-boardroom_b7630ea0.jpg"], ["إدارية", "مودرن", "أزرق ليلي", "/images/qutb-design-office-creative_fa91068a.jpg"],
  ["تجارية", "فاخر", "أسود ولمسة نحاس", "/images/qutb-design-retail_0b4b37cc.jpg"], ["تجارية", "فاخر", "رملي وذهبي", "/images/qutb-design-retail-luxury_26d956d6.jpg"], ["تجارية", "مودرن", "أخضر زيتوني", "/images/qutb-design-cafe-contemporary_afc3a7b2.jpg"], ["تجارية", "فاخر", "وردي هادئ", "/images/qutb-design-retail-jewelry_7fbf56a0.jpg"],
  ["مكتبية", "صناعي", "أبيض وفحمي", "/images/qutb-design-office-lounge_ff1d99e9.jpg"],
].map(([category, style, palette, image], index) => ({ id: index + 1, category, style, palette, image, title: `${category} · ${style} · ${palette}`, description: `${designCategoryNotes[category]} تصور ${style.toLowerCase()} بتوليفة ${palette}.` }));

const processSteps = [
  { number: "01", title: "نستمع", text: "نفهم رؤيتك، أسلوب حياتك، وما تريد أن تشعر به في المكان." },
  { number: "02", title: "نخطط", text: "نحوّل الطموح إلى نطاق عمل واضح، ميزانية منضبطة، وجدول واقعي." },
  { number: "03", title: "نبني", text: "فريق واحد يتابع كل قرار وتنفيذ حتى أدق لمسة في الموقع." },
  { number: "04", title: "نسلّم", text: "مساحة جاهزة للحياة، مع عناية ما بعد التسليم وراحة بالك." },
];

const founderCopy: Record<Language, string[]> = {
  ar: ["المهندس عبدالله جمعة قطب هو مهندس مدني ورائد أعمال مصري، ومؤسس والرئيس التنفيذي لشركة قطب للبناء والتشطيبات – Kotb Construction.", "تخرّج عبدالله من كلية الهندسة – جامعة الإسكندرية، وانطلق من خلفيته الهندسية وشغفه بمجال البناء والتشييد ليؤسس كيانًا متخصصًا في أعمال البناء والتشطيبات وإدارة وتنفيذ المشروعات.", "يرتكز نهجه في العمل على الجمع بين الخبرة الهندسية، الإدارة الفعّالة، جودة التنفيذ، ودقة التفاصيل، مع التركيز على تحقيق أفضل قيمة ممكنة للعميل دون التنازل عن جودة المشروع.", "ومن خلال قيادته لـ Kotb Construction، يسعى عبدالله إلى بناء شركة ذات معايير مهنية واضحة، تقدم حلولًا متكاملة في البناء والتشطيبات، وتضع الجودة، الالتزام، والشفافية في مقدمة أولوياتها.", "ويؤمن بأن المشروع الناجح لا يبدأ من موقع التنفيذ، وإنما يبدأ من قرار هندسي صحيح، وتخطيط دقيق، وإدارة واعية لكل تفصيلة."],
  en: ["Eng. Abdalla Gomaa Kotb is an Egyptian civil engineer and entrepreneur, and the Founder & CEO of Kotb Construction.", "Abdalla graduated from the Faculty of Engineering at Alexandria University. He built on his engineering background and passion for construction to establish a company specialized in construction, finishing, and project execution.", "His approach combines engineering expertise, effective management, execution quality, and attention to detail, always seeking the best value for the client without compromising the project’s quality.", "Through his leadership of Kotb Construction, Abdalla is building a company with clear professional standards and integrated construction and finishing solutions, placing quality, commitment, and transparency first.", "He believes a successful project does not begin on site; it begins with the right engineering decision, careful planning, and thoughtful management of every detail."],
  fr: ["L’ingénieur Abdalla Gomaa Kotb est un ingénieur civil et entrepreneur égyptien, fondateur et PDG de Kotb Construction.", "Diplômé de la Faculté d’ingénierie de l’Université d’Alexandrie, Abdalla s’est appuyé sur son parcours technique et sa passion du bâtiment pour créer une entreprise spécialisée dans la construction, la finition et la gestion de projets.", "Son approche associe expertise technique, gestion efficace, qualité d’exécution et précision des détails, afin d’offrir la meilleure valeur au client sans compromis sur la qualité.", "À la tête de Kotb Construction, Abdalla développe une entreprise aux standards professionnels clairs, proposant des solutions intégrées et plaçant qualité, engagement et transparence au premier plan.", "Il croit qu’un projet réussi ne commence pas sur le chantier, mais par une bonne décision technique, une planification précise et une gestion attentive de chaque détail."]
};

type GalleryPhoto = { image: string; source: string; title: Record<Language, string>; description: Record<Language, string> };
const galleryPhotos: GalleryPhoto[] = [
  { image: "/images/kotb-work-03_a1204d58.jpg", source: "https://www.facebook.com/photo.php?fbid=1530178565785687&set=pb.100063806754154.-2207520000&type=3", title: { ar: "صورة من مقرنا الحالي", en: "A view from our current headquarters", fr: "Vue de notre siège actuel" }, description: { ar: "لقطة من أجواء مقر قطب الحالي والتفاصيل التي تعكس هويتنا.", en: "A glimpse of our current headquarters and the details that reflect our identity.", fr: "Un aperçu de notre siège actuel et des détails qui reflètent notre identité." } },
  { image: "/images/kotb-work-04_9164221e.jpg", source: "https://www.facebook.com/photo.php?fbid=1529558622514348&set=pb.100063806754154.-2207520000&type=3", title: { ar: "من تفاصيل مقر قطب الحالي", en: "Details from our current headquarters", fr: "Détails de notre siège actuel" }, description: { ar: "تفصيل داخلي من مقرنا الحالي يبرز اهتمامنا بالإضاءة وجودة التشطيب.", en: "An interior detail from our current headquarters, highlighting our care for lighting and finish quality.", fr: "Un détail intérieur de notre siège actuel, soulignant notre attention à la lumière et aux finitions." } },
  { image: "/images/kotb-work-05_4077d092.jpg", source: "https://www.facebook.com/photo.php?fbid=1529558579181019&set=pb.100063806754154.-2207520000&type=3", title: { ar: "لقطة من أجواء مقرنا", en: "A glimpse of our headquarters", fr: "Un aperçu de notre siège" }, description: { ar: "جزء من المساحات الداخلية في مقر قطب الحالي كما تظهر في صورنا اليومية.", en: "Part of the interior spaces at Kotb’s current headquarters, as seen in our daily images.", fr: "Une partie des espaces intérieurs de notre siège actuel, dans nos images du quotidien." } },
  { image: "/images/kotb-work-06_2d352434.jpg", source: "https://www.facebook.com/photo.php?fbid=1529558559181021&set=pb.100063806754154.-2207520000&type=3", title: { ar: "هوية قطب داخل مقرنا الحالي", en: "Kotb identity inside our headquarters", fr: "L’identité Kotb dans notre siège" }, description: { ar: "حضور هوية قطب داخل مقرنا الحالي، حيث تبدأ منه كل تفاصيل العمل والمتابعة.", en: "Kotb’s identity inside our current headquarters, where our work and follow-up begin.", fr: "L’identité Kotb dans notre siège actuel, d’où commencent notre travail et notre suivi." } },
  { image: "/images/kotb-work-07_fba4c2a8.jpg", source: "https://www.facebook.com/photo.php?fbid=1529558519181025&set=pb.100063806754154.-2207520000&type=3", title: { ar: "واجهة مقر قطب الحالي", en: "The front of our current headquarters", fr: "La façade de notre siège actuel" }, description: { ar: "تفصيل من واجهة مقرنا الحالي ولافتة قطب للبناء والتشطيبات.", en: "A detail of our current headquarters and the Kotb Construction sign.", fr: "Un détail de la façade de notre siège actuel et de l’enseigne Kotb Construction." } },
  { image: "/images/kotb-work-08_19e83fb7.jpg", source: "https://www.facebook.com/photo.php?fbid=1529558492514361&set=pb.100063806754154.-2207520000&type=3", title: { ar: "تفاصيل من داخل مقرنا", en: "Details inside our headquarters", fr: "Détails de notre siège" }, description: { ar: "صورة أخرى من تفاصيل التشطيب والأجواء الداخلية في مقر قطب الحالي.", en: "Another view of the finishing details and interior atmosphere at our current headquarters.", fr: "Une autre vue des finitions et de l’atmosphère intérieure de notre siège actuel." } },
];
const archivePhoto = (image: string, source: string, ar: string, en: string, fr: string, arDescription: string, enDescription: string, frDescription: string): GalleryPhoto => ({ image, source, title: { ar, en, fr }, description: { ar: arDescription, en: enDescription, fr: frDescription } });
const archivePhotos: GalleryPhoto[] = [
  archivePhoto("/images/kotb-all-07_7c496b8e.jpg", "https://www.facebook.com/photo.php?fbid=1529558445847699&set=pb.100063806754154.-2207520000&type=3", "تفصيل يحمل هوية قطب", "A detail carrying Kotb’s identity", "Un détail marqué par l’identité Kotb", "لقطة أرشيفية من المحتوى البصري المنشور على صفحة قطب.", "An archival image from the visual content published on Kotb’s page.", "Une image d’archive issue du contenu visuel publié sur la page de Kotb."),
  archivePhoto("/images/kotb-all-08_7378ad67.jpg", "https://www.facebook.com/photo.php?fbid=1529558432514367&set=pb.100063806754154.-2207520000&type=3", "اختيارات خامات وتفاصيل", "Material choices and details", "Choix de matériaux et détails", "مرجع بصري يبرز الخامات والتفاصيل التي تظهر في محتوى قطب.", "A visual reference highlighting materials and details featured in Kotb’s content.", "Une référence visuelle mettant en valeur les matériaux et détails présents dans le contenu de Kotb."),
  archivePhoto("/images/kotb-all-09_ffcafd50.jpg", "https://www.facebook.com/photo.php?fbid=1529558399181037&set=pb.100063806754154.-2207520000&type=3", "لقطة من أرشيف قطب", "A glimpse from Kotb’s archive", "Un aperçu des archives de Kotb", "صورة من أرشيف قطب البصري، محفوظة ضمن مكتبة المحتوى المنشور.", "A visual archive image preserved in Kotb’s published content library.", "Une image d’archive visuelle conservée dans la bibliothèque de contenu de Kotb."),
  archivePhoto("/images/kotb-all-10_3a6c8bd5.jpg", "https://www.facebook.com/photo.php?fbid=1529558382514372&set=pb.100063806754154.-2207520000&type=3", "هوية قطب في المشهد", "Kotb identity in focus", "L’identité Kotb à l’honneur", "تفصيل بسيط يبرز حضور العلامة وهوية قطب في الصور المنشورة.", "A simple detail highlighting Kotb’s brand presence in the published images.", "Un détail qui souligne la présence de la marque Kotb dans les images publiées."),
  archivePhoto("/images/kotb-all-11_2fbcf061.jpg", "https://www.facebook.com/photo.php?fbid=1529558342514376&set=pb.100063806754154.-2207520000&type=3", "لوحة ألوان من أرشيفنا", "A palette from our archive", "Une palette de nos archives", "مرجع لوني من المواد البصرية التي شاركتها قطب مع جمهورها.", "A color reference from the visual materials Kotb shared with its audience.", "Une référence chromatique issue des contenus visuels partagés par Kotb."),
  archivePhoto("/images/kotb-all-12_278e1b25.jpg", "https://www.facebook.com/photo.php?fbid=1529558322514378&set=pb.100063806754154.-2207520000&type=3", "زاوية من محتوى قطب", "A corner from Kotb’s content", "Un angle du contenu de Kotb", "لقطة هادئة من الأرشيف البصري المنشور على صفحات قطب.", "A calm image from the visual archive published across Kotb’s pages.", "Une image sobre issue des archives visuelles publiées par Kotb."),
  archivePhoto("/images/kotb-all-13_6fcb0eda.jpg", "https://www.facebook.com/photo.php?fbid=1529558272514383&set=pb.100063806754154.-2207520000&type=3", "تفصيلة داخلية ملهمة", "An inspiring interior detail", "Un détail intérieur inspirant", "مرجع بصري للإلهام مستخرج من محتوى قطب المنشور، دون ربطه بمشروع محدد.", "An inspirational visual reference from Kotb’s published content, not tied to a specific project.", "Une référence visuelle inspirante issue du contenu de Kotb, sans lien avec un projet précis."),
  archivePhoto("/images/kotb-all-14_24f22424.jpg", "https://www.facebook.com/photo.php?fbid=1529558259181051&set=pb.100063806754154.-2207520000&type=3", "حضور قطب في المكان", "Kotb presence in the space", "La présence de Kotb dans l’espace", "صورة أرشيفية يظهر فيها حضور العلامة داخل المشهد.", "An archival image showing the brand’s presence in the scene.", "Une image d’archive où la marque s’inscrit dans l’espace."),
  archivePhoto("/images/kotb-all-15_42a75b07.jpg", "https://www.facebook.com/photo.php?fbid=1528549849281892&set=pb.100063806754154.-2207520000&type=3", "علامة قطب", "The Kotb mark", "La marque Kotb", "تفصيل من الهوية البصرية التي تظهر في أرشيف قطب المنشور.", "A detail from the visual identity featured in Kotb’s published archive.", "Un détail de l’identité visuelle présente dans les archives publiées de Kotb."),
  archivePhoto("/images/kotb-all-29_900a1401.jpg", "https://www.facebook.com/photo.php?fbid=624609276342625&set=pb.100063806754154.-2207520000&type=3", "مرجع بصري من أرشيف قطب", "A visual reference from Kotb’s archive", "Une référence visuelle des archives Kotb", "صورة مرجعية من المحتوى المنشور، للعرض والإلهام فقط.", "A reference image from published content, presented for inspiration only.", "Une image de référence issue du contenu publié, présentée à titre d’inspiration."),
  archivePhoto("/images/kotb-all-30_77fa9cb6.jpg", "https://www.facebook.com/photo.php?fbid=624609269675959&set=pb.100063806754154.-2207520000&type=3", "تفاصيل تصنع الإحساس", "Details that shape the feeling", "Des détails qui créent l’émotion", "لقطة من أرشيف الصور التي تعكس اهتمام قطب بالتفاصيل والتكوين.", "An archival image reflecting Kotb’s attention to detail and composition.", "Une image d’archive qui reflète l’attention de Kotb aux détails et à la composition."),
  archivePhoto("/images/kotb-all-31_4f82db92.jpg", "https://www.facebook.com/photo.php?fbid=624609193009300&set=pb.100063806754154.-2207520000&type=3", "مساحة تستحق التأمل", "A space worth noticing", "Un espace qui mérite le regard", "مرجع بصري من منشورات قطب، يوضح لغة المساحات والمواد.", "A visual reference from Kotb’s posts showing a language of spaces and materials.", "Une référence visuelle des publications de Kotb autour des espaces et des matériaux."),
  archivePhoto("/images/kotb-all-32_599b8e96.jpg", "https://www.facebook.com/photo.php?fbid=624609189675967&set=pb.100063806754154.-2207520000&type=3", "إلهام من مكتبة قطب", "Inspiration from Kotb’s library", "Inspiration de la bibliothèque Kotb", "صورة إلهامية من الأرشيف البصري العام لقطب.", "An inspirational image from Kotb’s public visual archive.", "Une image d’inspiration issue des archives visuelles publiques de Kotb."),
  archivePhoto("/images/kotb-all-33_3a05a53d.jpg", "https://www.facebook.com/photo.php?fbid=624609149675971&set=pb.100063806754154.-2207520000&type=3", "تكوين داخلي متوازن", "A balanced interior composition", "Une composition intérieure équilibrée", "لقطة أرشيفية تعرض تكويناً داخلياً ضمن المحتوى المنشور.", "An archival image showing an interior composition from the published content.", "Une image d’archive présentant une composition intérieure issue du contenu publié."),
  archivePhoto("/images/kotb-all-34_a738f2a2.jpg", "https://www.facebook.com/photo.php?fbid=624609139675972&set=pb.100063806754154.-2207520000&type=3", "تفاصيل وخامات", "Details and materials", "Détails et matériaux", "مرجع بصري للخامات والتفاصيل كما ظهرت في محتوى قطب المنشور.", "A visual reference for materials and details as shown in Kotb’s published content.", "Une référence visuelle des matériaux et détails présentés dans le contenu de Kotb."),
  archivePhoto("/images/kotb-all-35_f3164187.jpg", "https://www.facebook.com/photo.php?fbid=624609109675975&set=pb.100063806754154.-2207520000&type=3", "لمسة من أرشيف قطب", "A touch from Kotb’s archive", "Une touche des archives Kotb", "صورة ختامية من الأرشيف البصري المنشور، للعرض والإلهام.", "A closing image from the published visual archive, for viewing and inspiration.", "Une dernière image des archives visuelles publiées, à regarder comme inspiration."),
];

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className={`brand-mark ${compact ? "brand-mark--compact" : ""}`} aria-label="قطب للبناء والتشطيبات">
      <img className="brand-mark__logo" src="/images/kotb-profile_5af09288.jpg" alt="شعار قطب للبناء والتشطيبات" />
      <span className="brand-mark__copy">
        <strong>قُطْب</strong>
      <small>KOTB CONSTRUCTION <i>س.ت ٨٧٥٦٢ · ب.ض ٨٧٨-٥٠٨-٧٨١</i></small>
      </span>
    </a>
  );
}

function LanguageSwitcher({ language, onChange }: { language: Language; onChange: (language: Language) => void }) {
  return <div className="language-switcher" role="group" aria-label="اختيار اللغة"><span className="language-switcher__globe">◎</span>{(["ar", "en", "fr"] as Language[]).map((item) => <button key={item} type="button" className={language === item ? "is-active" : ""} onClick={() => onChange(item)} aria-label={languageLabels[item]}>{item.toUpperCase()}</button>)}</div>;
}

export default function Home() {
  const [language, setLanguage] = useState<Language>(() => (typeof window !== "undefined" && (localStorage.getItem("kotb-language") as Language)) || "ar");
  const [menuOpen, setMenuOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const [portalStep, setPortalStep] = useState<"phone" | "otp" | "wallet">("phone");
  const [portalPhone, setPortalPhone] = useState("");
  const [portalOtp, setPortalOtp] = useState("");
  const [activeProject, setActiveProject] = useState(0);
  const [projectStoryOpen, setProjectStoryOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);
  const [activeVideo, setActiveVideo] = useState<LibraryVideo | null>(null);
  const [designCategory, setDesignCategory] = useState("الكل");
  const [designStyleFilter, setDesignStyleFilter] = useState("الكل");
  const [designPaletteFilter, setDesignPaletteFilter] = useState("الكل");
  const [designVisible, setDesignVisible] = useState(24);
  const [activeDesign, setActiveDesign] = useState<(typeof designCatalog)[number] | null>(null);
  const [favoriteDesignIds, setFavoriteDesignIds] = useState<number[]>(() => { if (typeof window === "undefined") return []; try { return JSON.parse(localStorage.getItem("kotb-favorite-designs") || "[]"); } catch { return []; } });
  const [compareDesignIds, setCompareDesignIds] = useState<number[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantInput, setAssistantInput] = useState("");
  const [assistantImage, setAssistantImage] = useState<string | undefined>();
  const [assistantMessages, setAssistantMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([{ role: "assistant", content: "أهلاً بيك، أنا قطب مساعدك في التصميم والتشطيبات. قولي حابب نصمم إيه؟ ولو عندك صورة للوضع الحالي ابعتهالي، ونبدأ نسأل بعض الأسئلة المهمة." }]);
  const [assistantImageResult, setAssistantImageResult] = useState<string | null>(null);
  const { data: mediaData, isLoading: mediaLoading } = trpc.videoLibrary.list.useQuery(undefined, { staleTime: 10 * 60 * 1000 });
  const assistantChat = trpc.kotbAssistant.chat.useMutation();
  const assistantGenerate = trpc.kotbAssistant.generateDesign.useMutation();
  const libraryVideos = mediaData?.videos ?? [];
  const tx = (value: string) => translations[language][value] || value;
  const filteredDesigns = designCatalog.filter((design) => (designCategory === "الكل" || design.category === designCategory) && (designStyleFilter === "الكل" || design.style === designStyleFilter) && (designPaletteFilter === "الكل" || design.palette === designPaletteFilter));
  const visibleDesigns = filteredDesigns.slice(0, designVisible);
  const designLabel = (category: string) => designCategoryLabels[language][category] || category;
  const designStyleLabel = (style: string) => designStyleLabels[language][style] || style;
  const designPaletteLabel = (palette: string) => designPaletteLabels[language][palette] || palette;
  const designTitle = (design: (typeof designCatalog)[number]) => `${designLabel(design.category)} · ${designStyleLabel(design.style)} · ${designPaletteLabel(design.palette)}`;
  const designDescription = (design: (typeof designCatalog)[number]) => language === "ar" ? `${designNoteTranslations.ar[design.category]} هذا الاتجاه ${design.style} بدرجات ${design.palette}.` : `${designNoteTranslations[language][design.category]} ${language === "en" ? `${designStyleLabel(design.style)} direction with a ${designPaletteLabel(design.palette)} palette.` : `Direction ${designStyleLabel(design.style).toLowerCase()} avec une palette ${designPaletteLabel(design.palette)}.`}`;
  const designMaterialsText = (design: (typeof designCatalog)[number]) => designMaterials[language][design.category];
  const designUseText = (design: (typeof designCatalog)[number]) => designUses[language][design.category];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    localStorage.setItem("kotb-language", language);
  }, [language]);

  useEffect(() => { localStorage.setItem("kotb-favorite-designs", JSON.stringify(favoriteDesignIds)); }, [favoriteDesignIds]);

  const closeMenu = () => setMenuOpen(false);
  const toggleFavorite = (id: number) => setFavoriteDesignIds((ids) => ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]);
  const toggleCompare = (id: number) => setCompareDesignIds((ids) => ids.includes(id) ? ids.filter((item) => item !== id) : ids.length < 3 ? [...ids, id] : (toast.info(language === "ar" ? "يمكن مقارنة ثلاثة تصميمات فقط" : language === "en" ? "You can compare up to three designs" : "Vous pouvez comparer trois designs au maximum"), ids));
  const compareDesigns = compareDesignIds.map((id) => designCatalog.find((design) => design.id === id)).filter(Boolean) as (typeof designCatalog)[number][];
  const shareText = (design: (typeof designCatalog)[number]) => language === "ar" ? `شاهد هذا الاتجاه من مكتبة تصميمات قطب: ${designTitle(design)}` : language === "en" ? `Explore this Kotb design direction: ${designTitle(design)}` : `Découvrez cette direction de design Kotb : ${designTitle(design)}`;
  const shareDesign = async (design: (typeof designCatalog)[number]) => {
    const url = `${window.location.origin}${window.location.pathname}#design-${design.id}`;
    const text = shareText(design);
    if (navigator.share) {
      try { await navigator.share({ title: designTitle(design), text, url }); return; } catch (error) { if ((error as DOMException).name === "AbortError") return; }
    }
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };
  const shareFavorites = async () => {
    const favorites = designCatalog.filter((design) => favoriteDesignIds.includes(design.id));
    if (!favorites.length) { toast.info(language === "ar" ? "احفظ تصميمًا واحدًا على الأقل أولاً" : language === "en" ? "Save at least one design first" : "Enregistrez d’abord au moins un design"); return; }
    const url = `${window.location.origin}${window.location.pathname}#favorites`;
    const text = language === "ar" ? `هذه تصميماتي المفضلة من مكتبة قطب (${favorites.length} تصميم).` : language === "en" ? `My favorite selections from the Kotb design library (${favorites.length} designs).` : `Ma sélection favorite de la bibliothèque Kotb (${favorites.length} designs).`;
    if (navigator.share) {
      try { await navigator.share({ title: language === "ar" ? "تصميماتي المفضلة من قطب" : language === "en" ? "My Kotb favorites" : "Mes favoris Kotb", text, url }); return; } catch (error) { if ((error as DOMException).name === "AbortError") return; }
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`, "_blank", "noopener,noreferrer");
  };
  const sendAssistantMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = assistantInput.trim();
    if (!text || assistantChat.isPending) return;
    const nextMessages = [...assistantMessages, { role: "user" as const, content: text }];
    setAssistantMessages(nextMessages); setAssistantInput("");
    try { const result = await assistantChat.mutateAsync({ messages: nextMessages, imageData: assistantImage }); setAssistantMessages((messages) => [...messages, { role: "assistant", content: result.reply }]); }
    catch { setAssistantMessages((messages) => [...messages, { role: "assistant", content: "حصل عطل بسيط عندي. جرّب تبعت رسالتك تاني أو تواصل مع الإدارة على واتساب 01272988610." }]); }
  };
  const uploadAssistantImage = (event: React.ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (!file) return; if (!file.type.startsWith("image/")) { toast.error("اختار صورة فقط من فضلك"); return; } const reader = new FileReader(); reader.onload = () => { const image = new Image(); image.onload = () => { const scale = Math.min(1, 1600 / Math.max(image.naturalWidth, image.naturalHeight)); const canvas = document.createElement("canvas"); canvas.width = Math.round(image.naturalWidth * scale); canvas.height = Math.round(image.naturalHeight * scale); canvas.getContext("2d")?.drawImage(image, 0, 0, canvas.width, canvas.height); setAssistantImage(canvas.toDataURL("image/jpeg", .82)); }; image.src = String(reader.result); }; reader.readAsDataURL(file); };
  const generateAssistantDesign = async () => {
    const brief = assistantMessages.filter((message) => message.role === "user").map((message) => message.content).join("\n");
    if (brief.length < 80 || assistantGenerate.isPending) { if (brief.length < 80) toast.info("اكتب نوع المكان والمساحة والستايل والألوان الأول عشان أطلعلك تصور أدق."); return; }
    try { const result = await assistantGenerate.mutateAsync({ brief, imageData: assistantImage }); setAssistantImageResult(result.imageUrl ?? null); setAssistantMessages((messages) => [...messages, { role: "assistant", content: "تمام، عملتلك تصور مبدئي بناءً على التفاصيل اللي قلتها. خليه نقطة بداية ونطوره مع الإدارة حسب المقاسات والتنفيذ." }]); }
    catch { toast.error("تعذر توليد التصور حالياً، جرّب مرة تانية بعد لحظات."); }
  };

  const openClientPortal = () => { setPortalStep("phone"); setPortalPhone(""); setPortalOtp(""); setPortalOpen(true); };
  const requestDemoOtp = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); if (portalPhone.replace(/\D/g, "").length < 10) { toast.error(language === "ar" ? "اكتب رقم هاتف صحيحاً" : language === "en" ? "Enter a valid phone number" : "Saisissez un numéro valide"); return; } setPortalStep("otp"); toast.success(language === "ar" ? "تم إرسال كود تجريبي" : language === "en" ? "Demo code sent" : "Code de démonstration envoyé", { description: language === "ar" ? "استخدم 1234 للمعاينة فقط" : "Use 1234 for this preview" }); };
  const verifyDemoOtp = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); if (portalOtp === "1234") setPortalStep("wallet"); else toast.error(language === "ar" ? "الكود غير صحيح — استخدم 1234 في المعاينة" : language === "en" ? "Incorrect code — use 1234 in preview" : "Code incorrect — utilisez 1234"); };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("_subject", "طلب جديد من موقع قطب للبناء والتشطيبات");
    formData.append("_captcha", "false");
    try {
      const response = await fetch("https://formsubmit.co/ajax/kotbdesign@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      if (!response.ok) throw new Error("submission_failed");
      setSubmitted(true);
      form.reset();
      toast.success("وصلنا طلبك — سنتواصل معك قريباً", { description: "شكراً لثقتك بقطب." });
    } catch {
      toast.error("تعذر إرسال الطلب الآن", { description: "يمكنك التواصل معنا مباشرة عبر واتساب أو الهاتف." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="top" className="site-shell" dir={language === "ar" ? "rtl" : "ltr"}>
      <section className="hero" aria-label="واجهة الموقع">
        <div className="hero__image" />
        <div className="hero__grain" />
        <header className="site-header container">
          <div className="site-header__brand-group"><BrandMark /><LanguageSwitcher language={language} onChange={setLanguage} /></div>
          <nav className={`main-nav ${menuOpen ? "main-nav--open" : ""}`} aria-label="التنقل الرئيسي">
            <a href="#about" onClick={closeMenu}>{tx("عن قطب")}</a>
            <a href="#services" onClick={closeMenu}>{tx("خدماتنا")}</a>
            <a href="#projects" onClick={closeMenu}>{tx("مشاريعنا")}</a>
            <a href="#video-library" onClick={closeMenu}>{tx("مكتبة الفيديو")}</a>
            <a href="#contact" onClick={closeMenu}>{tx("تواصل معنا")}</a>
            <a className="nav-call" href="tel:+201272988610" onClick={closeMenu}>
              <Phone size={15} />
              <span dir="ltr">+20 12 72988610</span>
            </a>
          </nav>
          <button className="client-login-trigger" type="button" onClick={openClientPortal}><UserRound size={15} /><span>{language === "ar" ? "حساب العميل" : language === "en" ? "Client portal" : "Espace client"}</span></button>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </header>

        <div className="hero__content container">
          <div className="hero__eyebrow"><span /> {tx("شركة بناء وتشطيبات مصرية")}</div>
          <h1>{tx("نبني ما يستحق")}<br /><em>{tx("أن يُعاش.")}</em></h1>
          <p>{tx("نصنع مساحات تنتمي إليك داخل مصر — من الفكرة الأولى إلى آخر لمسة، بجودة تُرى وتفاصيل تُحس.")}</p>
          <div className="hero__actions">
            <a className="button button--gold" href="#contact">{tx("ابدأ مشروعك معنا")} <ArrowUpLeft size={18} /></a>
            <a className="text-link text-link--light" href="#projects">{tx("استكشف أعمالنا")} <ArrowLeft size={18} /></a>
          </div>
        </div>
        <div className="hero__footer container">
          <span className="hero__location"><MapPin size={15} /> {tx("الإسكندرية · مصر")}</span>
          <a className="scroll-cue" href="#about"><span>{tx("اكتشف أكثر")}</span><span className="scroll-cue__line" /></a>
          <span className="hero__since">KOTB CONSTRUCTION <span>—</span> {tx("نبني بثقة")}</span>
        </div>
      </section>

      <section className="trust-strip" aria-label="أرقام قطب">
        <div className="container trust-strip__inner">
          <div className="trust-item"><strong>12+</strong><span>{tx("عاماً من الخبرة")}</span></div>
          <div className="trust-item"><strong>86</strong><span>{tx("مشروعاً منجزاً")}</span></div>
          <div className="trust-item"><strong>100%</strong><span>{tx("التزام بالمواعيد")}</span></div>
          <div className="trust-item trust-item--statement"><Sparkles size={17} /><span>{tx("نبني بثقة. نُنجز بضمير.")}</span></div>
        </div>
      </section>

      <main>
        <section id="about" className="section section--about container">
          <div className="section-kicker">01 <span /> {tx("عن قطب")}</div>
          <div className="about-grid">
            <div className="about-heading">
              <p className="overline">{tx("وجهة واحدة لكل تفاصيل البناء")}</p>
              <h2>{tx("نؤمن أن")}<br /><em>{tx("الجودة")}</em> {tx("أسلوب.")}</h2>
            </div>
            <div className="about-copy">
              <p className="lead">في قطب، لا نتعامل مع البناء كمراحل منفصلة. نحن نرى المشروع كقصة واحدة — تبدأ من طموحك، وتكبر مع كل قرار مدروس، وتنتهي بمكان يشبهك تماماً.</p>
              <p>{tx("يجمع فريقنا بين خبرة التنفيذ وحسّ التصميم، لنمنحك رحلة أكثر وضوحاً ونتيجة أكثر اتساقاً. لأن التفاصيل الصغيرة هي التي تصنع الفرق الكبير.")}</p>
              <p className="service-area-note">{tx("نغطي محافظة الإسكندرية بالكامل، وقريباً نصل إلى كل أنحاء الجمهورية والعالم.")}</p>
              <div className="why-kotb">
                <h3>{tx("لماذا تختار KOTB CONSTRUCTION؟")}</h3>
                <ul>
                  <li><Check size={15} /> {tx("إشراف هندسي مباشر")}</li>
                  <li><Check size={15} /> {tx("مقايسات وكميات دقيقة")}</li>
                  <li><Check size={15} /> {tx("متابعة مراحل التنفيذ")}</li>
                  <li><Check size={15} /> {tx("اختيار الخامات بعناية")}</li>
                  <li><Check size={15} /> {tx("شفافية في التكلفة")}</li>
                  <li><Check size={15} /> {tx("تقارير ومتابعة للعميل")}</li>
                  <li><Check size={15} /> {tx("حلول تناسب الميزانية")}</li>
                  <li><Check size={15} /> {tx("التزام بمعايير التنفيذ")}</li>
                </ul>
              </div>
              <a className="text-link text-link--dark" href="#contact">{tx("تعرّف على طريقتنا")} <ArrowLeft size={17} /></a>
            </div>
          </div>
        </section>

        <section className="section founder-section">
          <div className="container founder-grid">
            <div className="founder-portrait"><img src="/images/abdalla-kotb-founder_f78b8f3f.jpg" alt="المهندس عبدالله جمعة قطب، مؤسس والرئيس التنفيذي لشركة قطب للبناء والتشطيبات" /><span className="founder-portrait__stamp">KOTB<br /><small>CONSTRUCTION</small></span></div>
            <div className="founder-copy">
              <div className="section-kicker">02 <span /> {language === "ar" ? "كلمة المؤسس" : language === "en" ? "Founder’s note" : "Mot du fondateur"}</div>
              <p className="overline" dir="ltr">{language === "ar" ? "المؤسس والرئيس التنفيذي — قطب للبناء والتشطيبات" : language === "en" ? "Founder & CEO — KOTB CONSTRUCTION" : "Fondateur & PDG — KOTB CONSTRUCTION"}</p>
              <h2 dir={language === "ar" ? "rtl" : "ltr"}>{language === "ar" ? <>المهندس<br /><em>عبدالله جمعة قطب.</em></> : language === "en" ? <>Eng.<br /><em>Abdalla Gomaa Kotb.</em></> : <>Ing.<br /><em>Abdalla Gomaa Kotb.</em></>}</h2>
              <div className="founder-copy__text">{founderCopy[language].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            </div>
          </div>
        </section>

        <section id="services" className="section section--services">
          <div className="container">
            <div className="section-head">
              <div><div className="section-kicker">03 <span /> {tx("ماذا نقدم")}</div><h2>{tx("من الأساس")}<br /><em>{tx("إلى الإحساس.")}</em></h2></div>
              <p>{language === "ar" ? "خبرة متكاملة تحت سقف واحد، وفريق واحد يتحمل مسؤولية النتيجة كاملة داخل مصر، من مقرنا في محافظة الإسكندرية، وقريباً في كل الجمهورية والعالم." : language === "en" ? "Integrated expertise under one roof, with one team accountable for the complete result across Egypt, based in Alexandria, with nationwide and global reach coming soon." : "Une expertise intégrée sous un même toit, avec une équipe responsable du résultat partout en Égypte, depuis Alexandrie, bientôt dans le monde entier."}</p>
            </div>
            <div className="services-grid">
              {services.map((service) => {
                const Icon = service.icon;
                return <article className="service-card" key={service.number}>
                  <div className="service-card__top"><span>{service.number}</span><Icon size={25} strokeWidth={1.4} /></div>
                  <h3>{tx(service.title)}</h3>
                  <p>{tx(service.text)}</p>
                  <a href="#contact" aria-label={`اطلب خدمة ${service.title}`}><ArrowUpLeft size={20} /></a>
                </article>;
              })}
            </div>
          </div>
        </section>

        <section id="projects" className="section section--projects">
          <div className="container">
            <div className="section-head section-head--dark">
              <div><div className="section-kicker section-kicker--light">04 <span /> {tx("أفكار واتجاهات")}</div><h2>{tx("تصاميم")}<br /><em>{tx("تتكلم.")}</em></h2></div>
              <a className="text-link text-link--light" href="#contact">{language === "ar" ? "حوّل الفكرة لمشروع" : language === "en" ? "Turn the idea into a project" : "Transformez l’idée en projet"} <ArrowLeft size={17} /></a>
            </div>
            <div className="project-feature">
              <div className="project-feature__visual"><img src={projects[activeProject].image} alt={projects[activeProject].title} /><div className="project-feature__index">0{activeProject + 1}<span>/ 03</span></div></div>
              <div className="project-feature__details">
                <p className="overline overline--gold">{tx(projects[activeProject].category)}</p>
                <h3>{tx(projects[activeProject].title)}</h3>
                <p>{tx(projects[activeProject].description)}</p>
                <button className="text-link text-link--light project-story-trigger" type="button" onClick={() => setProjectStoryOpen(true)}>{tx("اكتشف قصة المشروع")} <ArrowLeft size={17} /></button>
                <div className="project-switcher" role="tablist" aria-label="تصفح المشاريع">
                  {projects.map((project, index) => <button key={project.title} className={activeProject === index ? "is-active" : ""} type="button" onClick={() => setActiveProject(index)} role="tab" aria-selected={activeProject === index}><span>0{index + 1}</span>{tx(project.title)}</button>)}
                </div>
              </div>
            </div>
            <div className="design-library">
              <div className="design-library__head"><div><span className="design-library__eyebrow">{language === "ar" ? "مكتبة تصورات مختارة" : language === "en" ? "Curated concept library" : "Bibliothèque de concepts sélectionnés"}</span><h3>{language === "ar" ? `${designCatalog.length} تصميم مستقل` : language === "en" ? `${designCatalog.length} distinct designs` : `${designCatalog.length} designs distincts`}</h3></div><p>{language === "ar" ? "كل بطاقة مرتبطة بصورة مستقلة ووصف مخصص لها، بدون تكرار أو نسب وصف لا يطابق التصميم." : language === "en" ? "Every card is linked to an independent image and a tailored description, with no repeated cards or mismatched captions." : "Chaque carte possède une image indépendante et une description dédiée, sans doublons ni légendes incohérentes."}</p></div>
              <div className="design-library__filters" role="tablist" aria-label={language === "ar" ? "تصنيفات التصميمات" : language === "en" ? "Design categories" : "Catégories de design"}>{designCategories.map((category) => <button key={category} type="button" className={designCategory === category ? "is-active" : ""} onClick={() => { setDesignCategory(category); setDesignStyleFilter("الكل"); setDesignPaletteFilter("الكل"); setDesignVisible(24); }}>{designLabel(category)}</button>)}</div>
              <div className="design-library__secondary-filters">
                <label>{language === "ar" ? "الأسلوب" : language === "en" ? "Style" : "Style"}<select value={designStyleFilter} onChange={(event) => { setDesignStyleFilter(event.target.value); setDesignVisible(24); }}><option value="الكل">{language === "ar" ? "كل الأساليب" : language === "en" ? "All styles" : "Tous les styles"}</option>{designStyles.map((style) => <option value={style} key={style}>{designStyleLabel(style)}</option>)}</select></label>
                <label>{language === "ar" ? "اللون" : language === "en" ? "Palette" : "Palette"}<select value={designPaletteFilter} onChange={(event) => { setDesignPaletteFilter(event.target.value); setDesignVisible(24); }}><option value="الكل">{language === "ar" ? "كل الألوان" : language === "en" ? "All palettes" : "Toutes les palettes"}</option>{designPalettes.map((palette) => <option value={palette} key={palette}>{designPaletteLabel(palette)}</option>)}</select></label>
              </div>
              <div className="design-library__actions"><span>{language === "ar" ? `${favoriteDesignIds.length} تصميم محفوظ` : language === "en" ? `${favoriteDesignIds.length} saved designs` : `${favoriteDesignIds.length} designs enregistrés`}</span><div className="design-library__action-buttons"><button type="button" disabled={!compareDesigns.length} onClick={() => setCompareOpen(true)}><Scale size={15} /> {language === "ar" ? `مقارنة (${compareDesigns.length}/3)` : language === "en" ? `Compare (${compareDesigns.length}/3)` : `Comparer (${compareDesigns.length}/3)`}</button><button type="button" disabled={!favoriteDesignIds.length} onClick={shareFavorites}><Share2 size={15} /> {language === "ar" ? "مشاركة المفضلة" : language === "en" ? "Share favorites" : "Partager les favoris"}</button></div></div>
              <div className="design-catalog-grid">{visibleDesigns.map((design) => <article className="design-catalog-card" id={`design-${design.id}`} key={design.id} style={{ "--design-image": `url(${design.image})`, "--design-hue": `${(design.id * 37) % 360}` } as React.CSSProperties}><div className="design-catalog-card__hit-area" role="button" tabIndex={0} onClick={() => setActiveDesign(design)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setActiveDesign(design); }} aria-label={`${detailLabels[language].view}: ${designTitle(design)}`}><div className="design-catalog-card__visual"><span>{String(design.id).padStart(4, "0")}</span><b>{designStyleLabel(design.style)}</b><div className="design-catalog-card__tools"><button type="button" className={favoriteDesignIds.includes(design.id) ? "is-active" : ""} onClick={(event) => { event.stopPropagation(); toggleFavorite(design.id); }} aria-label={language === "ar" ? "حفظ في المفضلة" : "Save favorite"}><Heart size={15} fill={favoriteDesignIds.includes(design.id) ? "currentColor" : "none"} /></button><button type="button" className={compareDesignIds.includes(design.id) ? "is-active" : ""} onClick={(event) => { event.stopPropagation(); toggleCompare(design.id); }} aria-label={language === "ar" ? "إضافة للمقارنة" : "Add to comparison"}><Scale size={15} /></button><button type="button" onClick={(event) => { event.stopPropagation(); shareDesign(design); }} aria-label={language === "ar" ? "مشاركة التصميم" : "Share design"}><Share2 size={15} /></button></div></div><div className="design-catalog-card__body"><small>{designLabel(design.category)} · {designPaletteLabel(design.palette)}</small><h4>{designTitle(design)}</h4><p>{designDescription(design)}</p><span className="design-catalog-card__cta">{detailLabels[language].view} <ArrowLeft size={14} /></span></div></div></article>)}</div>
              {designVisible < filteredDesigns.length && <button type="button" className="design-library__more" onClick={() => setDesignVisible((count) => count + 24)}>{language === "ar" ? "عرض تصميمات إضافية" : language === "en" ? "Load more designs" : "Afficher plus de designs"} <span>+</span></button>}
            </div>
          </div>
        </section>

        <section className="section section--media">
          <div className="container">
            <div className="media-intro">
              <div><div className="section-kicker">05 <span /> {tx("من مواقعنا")}</div><h2>{tx("شغلنا")}<br /><em>{tx("على الطبيعة.")}</em></h2></div>
              <div className="media-intro__copy"><p>{language === "ar" ? "شاهد تفاصيل التنفيذ وآخر التطورات من مواقعنا مباشرةً على صفحة قطب في فيسبوك." : language === "en" ? "See execution details and the latest updates from our sites on Kotb’s Facebook page." : "Découvrez les détails d’exécution et les dernières nouvelles de nos chantiers sur la page Facebook de Kotb."}</p><a className="text-link text-link--dark" href="https://www.facebook.com/kotbdesign/" target="_blank" rel="noreferrer">{tx("زيارة صفحتنا على فيسبوك")} <ArrowLeft size={17} /></a></div>
            </div>
            <div className="media-grid">
              <a className="media-card media-card--cover" href="https://www.facebook.com/kotbdesign/videos/1346622286456235/" target="_blank" rel="noreferrer">
                <img src="/images/kotb-facebook-cover_43e282fa.jpg" alt={language === "ar" ? "هوية قطب للبناء والتشطيبات" : "Kotb Construction identity"} />
                <span className="media-card__play">▶</span><div><small>{language === "ar" ? "فيديو من الموقع · 04:32" : language === "en" ? "Site video · 04:32" : "Vidéo du chantier · 04:32"}</small><strong>{language === "ar" ? "آخر التطورات في موقعنا بحي محرم باشا" : language === "en" ? "Latest updates from our Moharam Bek site" : "Dernières nouvelles de notre chantier à Moharam Bek"}</strong></div>
              </a>
              <a className="media-card" href="https://www.facebook.com/kotbdesign/videos/1551923555848857/" target="_blank" rel="noreferrer">
                <div className="media-card__placeholder media-card__placeholder--red"><Ruler size={28} /><span>{language === "ar" ? "تفاصيل تفرق" : language === "en" ? "Details matter" : "Les détails comptent"}</span></div><span className="media-card__play">▶</span><div><small>{language === "ar" ? "فنيات التشطيب" : language === "en" ? "Finishing craft" : "Art de la finition"}</small><strong>{language === "ar" ? "استلام تفاصيل مهمة في بنود التشطيب" : language === "en" ? "Inspecting critical finishing details" : "Contrôle des détails essentiels de finition"}</strong></div>
              </a>
              <a className="media-card" href="https://www.facebook.com/kotbdesign/videos/2422281154937460/" target="_blank" rel="noreferrer">
                <div className="media-card__placeholder media-card__placeholder--dark"><Building2 size={28} /><span>{language === "ar" ? "مقر قطب الجديد" : language === "en" ? "Kotb’s new office" : "Le nouveau bureau de Kotb"}</span></div><span className="media-card__play">▶</span><div><small>{language === "ar" ? "من داخل المكتب" : language === "en" ? "Inside the office" : "Dans nos bureaux"}</small><strong>{language === "ar" ? "أهلاً بكم في مقر قطب للبناء والتشطيبات" : language === "en" ? "Welcome to Kotb Construction headquarters" : "Bienvenue au siège de Kotb Construction"}</strong></div>
              </a>
            </div>
          </div>
        </section>

        <section id="photo-library" className="section section--photo-library">
          <div className="container">
            <div className="section-head">
              <div><div className="section-kicker">06 <span /> {language === "ar" ? "مكتبة الصور" : language === "en" ? "Photo library" : "Galerie photos"}</div><h2>{language === "ar" ? <>صور من<br /><em>شغلنا الحقيقي.</em></> : language === "en" ? <>A look at<br /><em>our real work.</em></> : <>Un regard sur<br /><em>notre travail.</em></>}</h2></div>
              <div className="photo-library__intro"><p>{language === "ar" ? "مجموعة منتقاة من الصور المنشورة على صفحة قطب الرسمية، مع وصف واضح ومصدر كل صورة." : language === "en" ? "A curated selection from Kotb’s official page, with a clear description and source for every image." : "Une sélection de la page officielle de Kotb, avec une description claire et la source de chaque image."}</p><small>{language === "ar" ? "المصدر: صفحة قطب الرسمية على فيسبوك" : language === "en" ? "Source: Kotb’s official Facebook page" : "Source : page Facebook officielle de Kotb"}</small></div>
            </div>
            <div className="photo-gallery-grid">{[...galleryPhotos, ...archivePhotos].map((photo, index) => <button className={`photo-gallery-card photo-gallery-card--${index === 0 ? "featured" : ""}`} key={photo.image} type="button" onClick={() => setActivePhoto(photo)}><img src={photo.image} alt={photo.title[language]} loading="lazy" /><span className="photo-gallery-card__shade" /><span className="photo-gallery-card__number">{String(index + 1).padStart(2, "0")}</span><span className="photo-gallery-card__open">↗</span><span className="photo-gallery-card__caption"><small>{galleryPhotos.includes(photo) ? (language === "ar" ? "صور من مقرنا الحالي" : language === "en" ? "From our current headquarters" : "De notre siège actuel") : (language === "ar" ? "من الأرشيف البصري لقطب" : language === "en" ? "From Kotb’s visual archive" : "Des archives visuelles de Kotb")}</small><strong>{photo.title[language]}</strong></span></button>)}</div>
          </div>
        </section>

        <section id="video-library" className="section section--video-library">
          <div className="container">
            <div className="section-head">
              <div><div className="section-kicker">06 <span /> {tx("مكتبة قطب")}</div><h2>{tx("شاهد أعمالنا")}<br /><em>{tx("من مكان واحد.")}</em></h2></div>
              <div className="video-library__intro"><p>{language === "ar" ? "مكتبة موحّدة تجمع أحدث ما ننشره على YouTube والمنصات الاجتماعية، بمشغلات رسمية داخل الموقع وبدون تكرار." : language === "en" ? "One library for our latest YouTube and social content, with official in-site players and no duplicates." : "Une bibliothèque qui réunit nos dernières vidéos YouTube et sociales, avec des lecteurs officiels et sans doublons."}</p><small>{mediaLoading ? (language === "ar" ? "جارٍ تحديث المكتبة…" : language === "en" ? "Updating library…" : "Mise à jour…") : mediaData?.source === "live" ? (language === "ar" ? "آخر تحديث تلقائي من قناة YouTube" : language === "en" ? "Automatically updated from YouTube" : "Mise à jour automatique depuis YouTube") : (language === "ar" ? "عرض احتياطي بانتظار ربط المنصات" : language === "en" ? "Fallback view while platforms connect" : "Affichage temporaire en attente de connexion")}</small></div>
            </div>
            <div className="video-library-grid">
              {libraryVideos.map((video) => {
                const label = video.platform === "youtube" ? "YouTube" : video.platform === "facebook" ? "Facebook" : video.platform === "instagram" ? "Instagram" : "TikTok";
                const canPlay = Boolean(video.embedUrl);
                return <article className={`video-library-card ${!canPlay ? "video-library-card--pending" : ""}`} key={video.id}>
                  <div className="video-library-card__media">
                    {canPlay ? <><iframe src={video.embedUrl} title={video.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /><button className="video-library-card__expand" type="button" onClick={() => setActiveVideo(video)} aria-label={`فتح ${video.title}`}><PlayCircle size={21} /></button></> : <div className="video-library-card__pending-icon"><PlayCircle size={34} /></div>}
                    <span className={`video-library-card__platform video-library-card__platform--${video.platform}`}>{label}</span>
                  </div>
                  <div className="video-library-card__body"><h3>{video.title}</h3><p>{video.description}</p>{canPlay ? <button type="button" className="text-link text-link--dark" onClick={() => setActiveVideo(video)}>{tx("مشاهدة داخل الموقع")} <ArrowLeft size={16} /></button> : <a className="text-link text-link--dark" href={video.sourceUrl} target="_blank" rel="noreferrer">{tx("زيارة الحساب بعد الربط")} <ArrowLeft size={16} /></a>}</div>
                </article>;
              })}
            </div>
          </div>
        </section>

        <section className="section--process container">
          <div className="section-head">
              <div><div className="section-kicker">07 <span /> {tx("كيف نعمل")}</div><h2>{tx("خطوات واضحة.")}<br /><em>{tx("نتيجة واثقة.")}</em></h2></div>
            <p>{language === "ar" ? "نُبقيك على اطلاع في كل خطوة، لأن راحة بالك جزء أساسي من جودة المشروع." : language === "en" ? "We keep you informed at every step, because your peace of mind is part of project quality." : "Nous vous tenons informé à chaque étape, car votre sérénité fait partie de la qualité."}</p>
          </div>
          <div className="process-grid">
            {processSteps.map((step) => <div className="process-step" key={step.number}><span className="process-step__number">{step.number}</span><div><h3>{tx(step.title)}</h3><p>{tx(step.text)}</p></div></div>)}
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-section__texture" />
          <div className="container contact-grid">
            <div className="contact-intro">
              <div className="section-kicker section-kicker--light">08 <span /> {tx("لنبنِ معاً")}</div>
              <h2>{tx("لديك فكرة؟")}<br /><em>{tx("نحن نسمع.")}</em></h2>
              <p>{language === "ar" ? "شاركنا تفاصيل مشروعك داخل مصر، وسنعود إليك خلال يومي عمل لنبدأ الحديث. نغطي الإسكندرية كاملة، وقريباً كل الجمهورية والعالم." : language === "en" ? "Share your project details in Egypt and we will get back to you within two business days. We cover all of Alexandria, with nationwide and global reach coming soon." : "Partagez les détails de votre projet en Égypte ; nous vous répondrons sous deux jours ouvrés. Nous couvrons toute Alexandrie, bientôt partout en Égypte et dans le monde."}</p>
              <div className="contact-details">
                <a href="tel:+201272988610"><Phone size={18} /><span dir="ltr">+20 12 72988610</span></a>
                <a href="mailto:kotbdesign@gmail.com"><Mail size={18} /><span>kotbdesign@gmail.com</span></a>
                <a className="contact-whatsapp" href="https://wa.me/201272988610?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%82%D8%B7%D8%A8%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%B7%D9%84%D8%A8%20%D9%85%D8%B9%D8%A7%D9%8A%D9%86%D8%A9" target="_blank" rel="noreferrer"><MessageCircle size={18} /><span>{language === "ar" ? "تواصل معنا عبر واتساب" : language === "en" ? "Contact us on WhatsApp" : "Contactez-nous sur WhatsApp"}</span></a>
                <span><MapPin size={18} /><span>برج النور، أمام نادي فالكون للسباحة، شارع 11، بيانكي البيطاش، الإسكندرية</span></span>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit} action="https://formsubmit.co/ajax/kotbdesign@gmail.com" method="POST">
              <div className="form-row"><label>{tx("الاسم الكامل")}<input required name="name" placeholder={language === "ar" ? "كيف نُناديك؟" : language === "en" ? "What should we call you?" : "Comment vous appeler ?"} /></label><label>{tx("رقم الجوال")}<input required name="phone" type="tel" placeholder="05X XXX XXXX" /></label></div>
              <label>{tx("نوع المشروع")}<select name="projectType" defaultValue=""><option value="" disabled>{tx("اختر نوع المشروع")}</option><option>{tx("بناء منزل")}</option><option>{tx("تشطيب وتجديد")}</option><option>{tx("تصميم داخلي")}</option><option>{tx("مشروع تجاري")}</option></select></label>
              <label>{tx("حدثنا عن مشروعك")}<textarea name="message" rows={4} placeholder={language === "ar" ? "الموقع، المساحة، والموعد المتوقع..." : language === "en" ? "Location, area and expected timeline…" : "Lieu, surface et délai souhaité…"}></textarea></label>
              <button className="button button--gold button--submit" type="submit" disabled={isSubmitting}>{isSubmitting ? (language === "ar" ? "جارٍ الإرسال..." : language === "en" ? "Sending…" : "Envoi…") : submitted ? <><Check size={18} /> {language === "ar" ? "تم الإرسال" : language === "en" ? "Sent" : "Envoyé"}</> : <>{tx("إرسال الطلب")} <ArrowUpLeft size={18} /></>}</button>
              <span className="form-note"><ShieldCheck size={14} /> {tx("معلوماتك بأمان، ولن تستخدم إلا للتواصل بشأن طلبك.")}</span>
            </form>
          </div>
        </section>
      </main>

      {portalOpen && <div className="client-portal-modal" role="dialog" aria-modal="true" aria-label={language === "ar" ? "حساب العميل" : language === "en" ? "Client portal" : "Espace client"} onClick={() => setPortalOpen(false)}><div className="client-portal-modal__content" onClick={(event) => event.stopPropagation()}><button type="button" className="project-story-modal__close" onClick={() => setPortalOpen(false)} aria-label="إغلاق">×</button>{portalStep === "phone" && <><div className="client-portal-icon"><UserRound size={22} /></div><p className="overline overline--gold">KOTB CLIENT PORTAL</p><h2>{language === "ar" ? "ادخل إلى حسابك" : language === "en" ? "Access your account" : "Accédez à votre compte"}</h2><p>{language === "ar" ? "أدخل رقم هاتفك المسجل لدينا لنرسل لك كود تحقق." : language === "en" ? "Enter your phone number to receive a verification code." : "Entrez votre numéro pour recevoir un code de vérification."}</p><form onSubmit={requestDemoOtp} className="client-portal-form"><label>{language === "ar" ? "رقم الهاتف" : language === "en" ? "Phone number" : "Numéro de téléphone"}<input value={portalPhone} onChange={(event) => setPortalPhone(event.target.value)} inputMode="tel" placeholder="+20 1X XXX XXXX" required /></label><button className="button button--gold" type="submit">{language === "ar" ? "إرسال كود التحقق" : language === "en" ? "Send verification code" : "Envoyer le code"}<ArrowUpLeft size={17} /></button></form><small className="client-portal-demo-note">{language === "ar" ? "نسخة تجريبية: لا يتم إرسال SMS حقيقي قبل ربط المزود." : language === "en" ? "Preview only: real SMS will be enabled after provider connection." : "Aperçu : les SMS réels seront activés après la connexion du fournisseur."}</small></>}{portalStep === "otp" && <><div className="client-portal-icon"><ShieldCheck size={22} /></div><p className="overline overline--gold">{language === "ar" ? "خطوة التحقق" : language === "en" ? "Verification step" : "Vérification"}</p><h2>{language === "ar" ? "أدخل الكود" : language === "en" ? "Enter the code" : "Entrez le code"}</h2><p>{language === "ar" ? `تم إرسال كود إلى ${portalPhone}` : language === "en" ? `A code was sent to ${portalPhone}` : `Un code a été envoyé à ${portalPhone}`}</p><form onSubmit={verifyDemoOtp} className="client-portal-form"><label>{language === "ar" ? "كود التحقق" : language === "en" ? "Verification code" : "Code de vérification"}<input value={portalOtp} onChange={(event) => setPortalOtp(event.target.value)} inputMode="numeric" maxLength={4} placeholder="1234" required /></label><button className="button button--gold" type="submit">{language === "ar" ? "دخول" : language === "en" ? "Continue" : "Continuer"}<ArrowUpLeft size={17} /></button></form></>}{portalStep === "wallet" && <><div className="client-portal-icon"><ShieldCheck size={22} /></div><p className="overline overline--gold">{language === "ar" ? "محفظتك" : language === "en" ? "Your wallet" : "Votre portefeuille"}</p><h2>{language === "ar" ? "أهلاً بك في حسابك" : language === "en" ? "Welcome to your account" : "Bienvenue dans votre compte"}</h2><p>{language === "ar" ? "تم تسجيل الدخول بنجاح. ستظهر بيانات مشروعك هنا بعد ربط Google Sheets." : language === "en" ? "You are signed in. Your project details will appear here once Google Sheets is connected." : "Connexion réussie. Vos données apparaîtront ici après la connexion à Google Sheets."}</p><div className="wallet-empty"><span>{language === "ar" ? "لا توجد بيانات مالية بعد" : language === "en" ? "No financial data yet" : "Aucune donnée financière"}</span><small>{language === "ar" ? "حساب تجريبي بدون مشروع مرتبط" : language === "en" ? "Demo account with no linked project" : "Compte démo sans projet associé"}</small></div><button className="button button--gold" type="button" onClick={() => setPortalOpen(false)}>{language === "ar" ? "العودة للموقع" : language === "en" ? "Back to website" : "Retour au site"}</button></>}</div></div>}
      {activePhoto && <div className="photo-modal" role="dialog" aria-modal="true" aria-label={activePhoto.title[language]} onClick={() => setActivePhoto(null)}><div className="photo-modal__content" onClick={(event) => event.stopPropagation()}><button type="button" className="photo-modal__close" onClick={() => setActivePhoto(null)} aria-label={tx("إغلاق")}>×</button><img src={activePhoto.image} alt={activePhoto.title[language]} /><div className="photo-modal__copy"><p className="overline overline--gold">{language === "ar" ? "من مكتبة قطب" : language === "en" ? "From Kotb library" : "De la galerie Kotb"}</p><h2>{activePhoto.title[language]}</h2><p>{activePhoto.description[language]}</p><a href={activePhoto.source} target="_blank" rel="noreferrer">{language === "ar" ? "عرض المنشور الأصلي" : language === "en" ? "View original post" : "Voir la publication originale"} <ArrowLeft size={16} /></a></div></div></div>}
      {activeDesign && <div className="design-detail-modal" role="dialog" aria-modal="true" aria-label={designTitle(activeDesign)} onClick={() => setActiveDesign(null)}><div className="design-detail-modal__content" onClick={(event) => event.stopPropagation()}><button type="button" className="design-detail-modal__close" onClick={() => setActiveDesign(null)} aria-label={detailLabels[language].close}>×</button><div className="design-detail-modal__image-wrap"><img src={activeDesign.image} alt={designTitle(activeDesign)} /></div><div className="design-detail-modal__copy"><p className="overline overline--gold">{designLabel(activeDesign.category)} · {String(activeDesign.id).padStart(4, "0")}</p><h2>{designTitle(activeDesign)}</h2><p className="design-detail-modal__intro">{designDescription(activeDesign)}</p><div className="design-detail-modal__facts"><div><small>{detailLabels[language].materials}</small><p>{designMaterialsText(activeDesign)}</p></div><div><small>{detailLabels[language].colors}</small><p>{designPaletteLabel(activeDesign.palette)}</p></div><div><small>{detailLabels[language].use}</small><p>{designUseText(activeDesign)}</p></div></div><a className="button button--gold" href="#contact" onClick={() => setActiveDesign(null)}>{language === "ar" ? "ناقش هذا الاتجاه معنا" : language === "en" ? "Discuss this direction" : "Discuter de cette direction"}<ArrowUpLeft size={17} /></a></div></div></div>}
      {compareOpen && <div className="design-compare-modal" role="dialog" aria-modal="true" aria-label={language === "ar" ? "مقارنة التصميمات" : language === "en" ? "Design comparison" : "Comparaison des designs"} onClick={() => setCompareOpen(false)}><div className="design-compare-modal__content" onClick={(event) => event.stopPropagation()}><button type="button" className="design-detail-modal__close" onClick={() => setCompareOpen(false)} aria-label={detailLabels[language].close}>×</button><div className="design-compare-modal__head"><p className="overline overline--gold">KOTB DESIGN LIBRARY</p><h2>{language === "ar" ? "قارن اختياراتك" : language === "en" ? "Compare your selections" : "Comparez vos sélections"}</h2><p>{language === "ar" ? "قارن الخامات واللون والاستخدام المقترح قبل اختيار الاتجاه الأقرب لمشروعك." : language === "en" ? "Compare materials, palette and intended use before choosing the direction for your project." : "Comparez les matériaux, la palette et l’usage avant de choisir la direction de votre projet."}</p></div><div className="design-compare-grid">{compareDesigns.map((design) => <article key={design.id}><img src={design.image} alt={designTitle(design)} /><h3>{designTitle(design)}</h3><dl><dt>{detailLabels[language].materials}</dt><dd>{designMaterialsText(design)}</dd><dt>{detailLabels[language].colors}</dt><dd>{designPaletteLabel(design.palette)}</dd><dt>{detailLabels[language].use}</dt><dd>{designUseText(design)}</dd></dl><button type="button" onClick={() => toggleCompare(design.id)}>{language === "ar" ? "إزالة" : language === "en" ? "Remove" : "Retirer"}</button></article>)}</div></div></div>}
      {projectStoryOpen && <div className="project-story-modal" role="dialog" aria-modal="true" aria-label={`تفاصيل ${projects[activeProject].title}`} onClick={() => setProjectStoryOpen(false)}><div className="project-story-modal__content" onClick={(event) => event.stopPropagation()}><button type="button" className="project-story-modal__close" onClick={() => setProjectStoryOpen(false)} aria-label="إغلاق">×</button><p className="overline overline--gold">{projects[activeProject].category}</p><h2>{projects[activeProject].title}</h2><p>{projects[activeProject].description}</p><p className="project-story-modal__note">هذا نموذج بصري توضيحي يساعدك على تحديد الاتجاه والخامات قبل تحويل الفكرة إلى مشروع يناسب احتياجاتك وميزانيتك.</p><a className="button button--gold" href="#contact" onClick={() => setProjectStoryOpen(false)}>ناقش فكرتك معنا <ArrowUpLeft size={18} /></a></div></div>}
      {activeVideo && <div className="video-modal" role="dialog" aria-modal="true" aria-label={activeVideo.title} onClick={() => setActiveVideo(null)}><div className="video-modal__content" onClick={(event) => event.stopPropagation()}><button type="button" className="video-modal__close" onClick={() => setActiveVideo(null)} aria-label="إغلاق">×</button><iframe src={`${activeVideo.embedUrl}${activeVideo.embedUrl.includes("?") ? "&" : "?"}autoplay=1`} title={activeVideo.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div></div>}

      <div className={`kotb-assistant ${assistantOpen ? "is-open" : ""}`}>
        {assistantOpen && <section className="kotb-assistant__panel" aria-label="مساعد قطب" role="dialog"><header><div className="kotb-assistant__brand"><span>ق</span><div><strong>قطب</strong><small>مساعد التصميم والتشطيبات</small></div></div><button type="button" onClick={() => setAssistantOpen(false)} aria-label="إغلاق"><X size={18} /></button></header><div className="kotb-assistant__messages">{assistantMessages.map((message, index) => <div className={`kotb-assistant__message kotb-assistant__message--${message.role}`} key={`${message.role}-${index}`}>{message.content}</div>)}{assistantChat.isPending && <div className="kotb-assistant__message kotb-assistant__message--assistant">قطب بيفكر في أنسب حل…</div>}{assistantImageResult && <div className="kotb-assistant__result"><img src={assistantImageResult} alt="تصور مبدئي من قطب" /><a href={assistantImageResult} target="_blank" rel="noreferrer">فتح الصورة بالحجم الكامل</a></div>}</div><div className="kotb-assistant__quick-actions"><label title="إرسال صورة للوضع الحالي"><span>إضافة صورة</span><input type="file" accept="image/*" onChange={uploadAssistantImage} /></label><button type="button" onClick={generateAssistantDesign} disabled={assistantGenerate.isPending || assistantMessages.filter((message) => message.role === "user").length === 0}>{assistantGenerate.isPending ? "جاري التصميم…" : "ولّدلي تصور"}</button></div>{assistantImage && <div className="kotb-assistant__upload-note">تم إرفاق صورة الوضع الحالي</div>}<form className="kotb-assistant__form" onSubmit={sendAssistantMessage}><input value={assistantInput} onChange={(event) => setAssistantInput(event.target.value)} placeholder="اكتب تفاصيل المكان هنا…" aria-label="رسالتك إلى قطب" /><button type="submit" disabled={assistantChat.isPending || !assistantInput.trim()}><ArrowUpLeft size={18} /></button></form><footer>للأسعار والمعاينة: واتساب <a href="https://wa.me/201272988610" target="_blank" rel="noreferrer">01272988610</a> · kotbdesign@gmail.com</footer></section>}
        <button className="kotb-assistant__launcher" type="button" onClick={() => setAssistantOpen((open) => !open)} aria-label={assistantOpen ? "إغلاق مساعد قطب" : "فتح مساعد قطب"}>{assistantOpen ? <X size={21} /> : <><span>ق</span><small>اسأل قطب</small></>}</button>
      </div>

      <footer className="site-footer">
        <div className="container site-footer__top"><BrandMark compact /><p>نبني ما يستحق أن يُعاش.</p><div className="business-license business-license--footer" dir="rtl"><span>س.ت ٨٧٥٦٢</span><span>ب.ض ٨٧٨-٥٠٨-٧٨١</span></div><div className="footer-social"><a href="https://www.instagram.com/kotb_co/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a><a href="https://www.facebook.com/kotbdesign/" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={18} /></a><a href="https://www.tiktok.com/@kotbco" target="_blank" rel="noreferrer" aria-label="TikTok"><Music2 size={18} /></a><a href="https://youtube.com/@eng.abdallagomaakotb?si=41vu47BIk8Hh1Jfn" target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube size={18} /></a></div></div>
        <div className="container site-footer__bottom"><span>© 2024 قطب للبناء والتشطيبات. جميع الحقوق محفوظة.</span><span>صُنع بعناية في مصر · الإسكندرية <span className="footer-dot">●</span></span><span className="business-license business-license--bottom" dir="rtl">س.ت ٨٧٥٦٢ · ب.ض ٨٧٨-٥٠٨-٧٨١</span></div>
      </footer>
    </div>
  );
}

export { Clock3, Compass, Hammer, Ruler };
