"use strict";

const STORAGE_KEYS = {
  recipes: "gh-pages-cooking-recipes-v1",
  favorites: "gh-pages-cooking-favorites-v1",
  theme: "gh-pages-cooking-theme-v1"
};

const categories = ["غذای اصلی", "خورش", "آش و سوپ", "غذای سبک", "دسر"];
const categoryArt = {
  "غذای اصلی": { emoji: "🍚", palette: "saffron" },
  "خورش": { emoji: "🍲", palette: "pomegranate" },
  "آش و سوپ": { emoji: "🥣", palette: "soup" },
  "غذای سبک": { emoji: "🥬", palette: "herb" },
  "دسر": { emoji: "🍮", palette: "rose" }
};

// این‌ها دستورهای نمونه‌اند؛ دستورهایی که خودت اضافه می‌کنی فقط در مرورگر ذخیره می‌شوند.
const sampleRecipes = [
  {
    id: "sample-fesenjan",
    title: "فسنجان مرغ",
    category: "خورش",
    time: 110,
    servings: 4,
    difficulty: "متوسط",
    description: "خورش جاافتاده‌ی گردو و انار؛ ترش و شیرین، درست مثل سفره‌ی مهمانی.",
    emoji: "🍲",
    palette: "pomegranate",
    ingredients: [
      "مرغ ۴ تکه (حدود ۷۰۰ گرم)",
      "گردوی آسیاب‌شده ۲ پیمانه",
      "رب انار ۳ تا ۴ قاشق غذاخوری",
      "پیاز ۱ عدد متوسط، رنده‌شده",
      "شکر ۱ تا ۲ قاشق غذاخوری (اختیاری)",
      "زردچوبه، نمک و فلفل",
      "آب سرد ۳ تا ۴ پیمانه"
    ],
    steps: [
      "پیاز را با کمی روغن تفت بده تا نرم و طلایی شود؛ زردچوبه را اضافه کن.",
      "گردوی آسیاب‌شده را چند دقیقه با حرارت ملایم تفت بده، سپس آب سرد را کم‌کم اضافه کن.",
      "وقتی خورش آرام جوشید، مرغ را اضافه کن و درِ قابلمه را نیمه‌باز بگذار.",
      "پس از حدود یک ساعت، رب انار و نمک را اضافه کن و اجازه بده خورش آرام جا بیفتد.",
      "ترشی و شیرینی را بچش و در صورت تمایل کمی شکر اضافه کن؛ با برنج سرو کن."
    ]
  },
  {
    id: "sample-lentil-rice",
    title: "عدس‌پلو با کشمش",
    category: "غذای اصلی",
    time: 65,
    servings: 4,
    difficulty: "آسان",
    description: "یک غذای مقوی و خوش‌رنگ با عدس، کشمش و عطر دارچین.",
    emoji: "🍚",
    palette: "saffron",
    ingredients: [
      "برنج ۳ پیمانه",
      "عدس ۱ پیمانه",
      "کشمش پلویی ½ پیمانه",
      "پیاز ۱ عدد بزرگ",
      "دارچین ½ قاشق چای‌خوری",
      "روغن، نمک و زردچوبه",
      "خرما یا گوشت چرخ‌کرده، در صورت تمایل"
    ],
    steps: [
      "عدس را بشوی و با آب بپز تا نرم شود، اما شکلش را حفظ کند؛ سپس آبکش کن.",
      "برنج خیس‌خورده را در آب جوش نیم‌پز کن و آبکش کن.",
      "در قابلمه کمی روغن و ته‌دیگ دلخواه بریز؛ برنج و عدس را لایه‌لایه همراه دارچین اضافه کن.",
      "برنج را با حرارت کم و دم‌کنی حدود ۴۰ دقیقه دم بگذار.",
      "پیاز را طلایی کن، کشمش را کوتاه تفت بده و هنگام سرو روی عدس‌پلو بریز."
    ]
  },
  {
    id: "sample-kuku-sabzi",
    title: "کوکو سبزی",
    category: "غذای سبک",
    time: 35,
    servings: 4,
    difficulty: "آسان",
    description: "سبزی خوش‌عطر، گردو و زرشک؛ ساده، سریع و مناسب هر وعده.",
    emoji: "🥬",
    palette: "herb",
    ingredients: [
      "سبزی کوکو خردشده ۴۰۰ گرم",
      "تخم‌مرغ ۴ عدد",
      "گردوی خردشده ۲ قاشق غذاخوری",
      "زرشک ۱ قاشق غذاخوری",
      "آرد ۱ قاشق غذاخوری (اختیاری)",
      "نمک، فلفل و زردچوبه",
      "روغن برای سرخ‌کردن"
    ],
    steps: [
      "سبزی را ریز خرد کن و اگر خیلی خیس است کمی آب اضافه‌اش را بگیر.",
      "تخم‌مرغ‌ها را با نمک، فلفل، زردچوبه و در صورت تمایل آرد هم بزن.",
      "سبزی، گردو و زرشک را به مایه اضافه کن و هم بزن تا یکدست شود.",
      "مایه را در تابه‌ی چرب و داغ بریز؛ درِ تابه را بگذار تا یک طرف کوکو ببندد.",
      "کوکو را برگردان و طرف دیگر را هم طلایی کن؛ با نان و سبزی خوردن سرو کن."
    ]
  },
  {
    id: "sample-ash-reshteh",
    title: "آش رشته",
    category: "آش و سوپ",
    time: 120,
    servings: 6,
    difficulty: "کمی زمان‌بر",
    description: "آش جاافتاده‌ی حبوبات و سبزی که با کشک و نعنا‌داغ کامل می‌شود.",
    emoji: "🥣",
    palette: "soup",
    ingredients: [
      "نخود و لوبیا، از شب قبل خیس‌خورده ۱ پیمانه",
      "عدس ½ پیمانه",
      "سبزی آش خردشده ۷۰۰ گرم",
      "رشته‌ی آش ۲۰۰ گرم",
      "پیاز ۳ عدد",
      "کشک به مقدار دلخواه",
      "نعنا خشک، زردچوبه، نمک و فلفل"
    ],
    steps: [
      "نخود و لوبیا را جداگانه بپز تا نرم شوند؛ عدس را هم در قابلمه‌ی اصلی نیم‌پز کن.",
      "حبوبات پخته و سبزی آش را به عدس اضافه کن و بگذار با حرارت ملایم بپزند.",
      "پیاز را خلالی سرخ کن و با زردچوبه به آش اضافه کن.",
      "وقتی سبزی پخت، رشته را خرد کن و داخل قابلمه بریز؛ هر از گاهی هم بزن تا به هم نچسبد.",
      "پس از جاافتادن، نمک و فلفل را تنظیم کن و با کشک و نعنا‌داغ سرو کن."
    ]
  },
  {
    id: "sample-tahchin",
    title: "ته‌چین مرغ",
    category: "غذای اصلی",
    time: 95,
    servings: 4,
    difficulty: "متوسط",
    description: "برنج زعفرانی و مرغ لابه‌لای یک ته‌دیگ طلایی و برشته.",
    emoji: "🍗",
    palette: "rice",
    ingredients: [
      "برنج ۳ پیمانه",
      "سینه یا ران مرغ ۴۰۰ گرم",
      "ماست چکیده ۱ پیمانه",
      "تخم‌مرغ ۲ عدد",
      "زعفران دم‌کرده ۳ قاشق غذاخوری",
      "زرشک ⅓ پیمانه",
      "کره، نمک و فلفل"
    ],
    steps: [
      "مرغ را با پیاز، نمک و فلفل بپز؛ بعد از خنک‌شدن ریش‌ریش کن.",
      "برنج را در آب جوش نیم‌پز و آبکش کن.",
      "ماست، تخم‌مرغ، زعفران، کمی نمک و چند قاشق روغن را مخلوط کن و برنج را در آن بریز.",
      "نیمی از برنج را در قابلمه‌ی چرب‌شده فشرده کن، مرغ و زرشک را وسط بگذار و بقیه‌ی برنج را اضافه کن.",
      "با دم‌کنی و حرارت کم حدود یک ساعت بپز؛ وقتی خنک شد، در دیس برگردان."
    ]
  },
  {
    id: "sample-sholeh-zard",
    title: "شله‌زرد",
    category: "دسر",
    time: 100,
    servings: 8,
    difficulty: "متوسط",
    description: "دسر خاطره‌انگیز زعفرانی با عطر گلاب و تزئین دارچین و خلال پسته.",
    emoji: "🍮",
    palette: "rose",
    ingredients: [
      "برنج نیم‌دانه ۱ پیمانه",
      "شکر ۲ پیمانه",
      "زعفران دم‌کرده‌ی غلیظ ½ پیمانه",
      "گلاب ½ پیمانه",
      "کره ۵۰ گرم",
      "خلال بادام ½ پیمانه",
      "دارچین و خلال پسته برای تزئین"
    ],
    steps: [
      "برنج را چند ساعت خیس کن؛ سپس با حدود ۶ پیمانه آب روی حرارت بگذار تا کاملاً شکفته شود.",
      "وقتی دانه‌های برنج نرم شدند، شکر را اضافه کن و مرتب هم بزن تا ته نگیرد.",
      "زعفران، گلاب، کره و خلال بادام را اضافه کن و حدود ۲۰ دقیقه با حرارت کم بپز.",
      "وقتی شله‌زرد غلیظ شد، آن را در ظرف‌های سرو بریز و کمی خنک کن.",
      "با دارچین و خلال پسته تزئین کن و برای جاافتادن در یخچال بگذار."
    ]
  }
];

const recipeGrid = document.querySelector("#recipe-grid");
const resultsStatus = document.querySelector("#results-status");
const recipeCount = document.querySelector("#recipe-count");
const favoriteCount = document.querySelector("#favorite-count");
const favoriteFilterCount = document.querySelector("#favorite-filter-count");
const searchInput = document.querySelector("#recipe-search");
const favoritesFilter = document.querySelector("#favorites-filter");
const emptyState = document.querySelector("#empty-state");
const emptyTitle = document.querySelector("#empty-title");
const emptyDescription = document.querySelector("#empty-description");
const addDialog = document.querySelector("#recipe-dialog");
const detailDialog = document.querySelector("#detail-dialog");
const detailContent = document.querySelector("#detail-content");
const recipeForm = document.querySelector("#recipe-form");
const toast = document.querySelector("#toast");
const importFile = document.querySelector("#import-file");
const themeToggle = document.querySelector("#theme-toggle");
const themeToggleLabel = document.querySelector("#theme-toggle-label");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');

const storedRecipes = readJSON(STORAGE_KEYS.recipes, []);
const storedFavorites = readJSON(STORAGE_KEYS.favorites, []);
let customRecipes = Array.isArray(storedRecipes) ? storedRecipes.map(cleanRecipe).filter(Boolean) : [];
let favoriteIds = new Set(Array.isArray(storedFavorites) ? storedFavorites.filter((id) => typeof id === "string") : []);
let activeCategory = "همه";
let favoritesOnly = false;
let currentRecipeId = null;
let toastTimer = 0;

function readJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (_error) {
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (_error) {
    showToast("ذخیره‌سازی مرورگر در دسترس نیست؛ تغییرها تا بستن صفحه می‌مانند.");
    return false;
  }
}

function makeId() {
  const randomPart = window.crypto && typeof window.crypto.randomUUID === "function"
    ? window.crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  return `custom-${randomPart}`;
}

function parseLocalizedNumber(value) {
  const normalized = String(value ?? "")
    .replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 0x0660))
    .replace(/[٫]/g, ".")
    .replace(/[٬,]/g, "")
    .trim();
  if (!normalized) return NaN;
  const number = Number(normalized);
  return Number.isFinite(number) ? number : NaN;
}

function cleanRecipe(raw) {
  if (!raw || typeof raw !== "object" || typeof raw.title !== "string") return null;
  const title = raw.title.trim().slice(0, 80);
  const ingredients = Array.isArray(raw.ingredients)
    ? raw.ingredients.map((item) => String(item).trim().slice(0, 240)).filter(Boolean).slice(0, 80)
    : [];
  const steps = Array.isArray(raw.steps)
    ? raw.steps.map((step) => String(step).trim().slice(0, 800)).filter(Boolean).slice(0, 80)
    : [];
  if (!title || ingredients.length === 0 || steps.length === 0) return null;

  const category = categories.includes(raw.category) ? raw.category : "غذای اصلی";
  const categoryStyle = categoryArt[category];
  const idFromFile = typeof raw.id === "string" && /^custom-[a-z0-9-]{1,140}$/i.test(raw.id)
    ? raw.id
    : makeId();
  const time = parseLocalizedNumber(raw.time);
  const servings = parseLocalizedNumber(raw.servings);

  return {
    id: idFromFile,
    title,
    category,
    time: Number.isFinite(time) ? Math.max(1, Math.min(999, Math.round(time))) : 45,
    servings: Number.isFinite(servings) ? Math.max(1, Math.min(99, Math.round(servings))) : 4,
    difficulty: typeof raw.difficulty === "string" ? raw.difficulty.slice(0, 24) : "دست‌ساز",
    description: typeof raw.description === "string" && raw.description.trim()
      ? raw.description.trim().slice(0, 180)
      : "دستور خانگیِ خودت؛ نوش جان!",
    emoji: categoryStyle.emoji,
    palette: categoryStyle.palette,
    ingredients,
    steps,
    custom: true
  };
}

function allRecipes() {
  return [...customRecipes, ...sampleRecipes];
}

function numberFa(value) {
  return new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 0 }).format(value);
}

function normalizeSearch(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .toLocaleLowerCase("fa-IR")
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, "")
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[ۀة]/g, "ه")
    .replace(/ـ/g, "")
    .replace(/\u200c/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  })[character]);
}

function safePalette(recipe) {
  const allowed = ["pomegranate", "saffron", "herb", "soup", "rice", "rose", "custom"];
  return allowed.includes(recipe.palette) ? recipe.palette : "custom";
}

function favoriteIcon() {
  return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m12 3 2.75 5.58 6.16.9-4.46 4.35 1.05 6.14L12 17.07l-5.5 2.9 1.05-6.14L3.1 9.48l6.16-.9L12 3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>';
}

function renderRecipeCard(recipe) {
  const id = escapeHTML(recipe.id);
  const title = escapeHTML(recipe.title);
  const description = escapeHTML(recipe.description);
  const category = escapeHTML(recipe.category);
  const emoji = escapeHTML(recipe.emoji || "🍽️");
  const isFavorite = favoriteIds.has(recipe.id);
  const favoriteLabel = isFavorite ? `برداشتن ${title} از پسندیده‌ها` : `افزودن ${title} به پسندیده‌ها`;
  const difficultyClass = recipe.difficulty === "متوسط" ? "difficulty--متوسط" : recipe.difficulty === "سخت" ? "difficulty--سخت" : "";

  return `
    <li class="recipe-card">
      <button class="favorite-button" type="button" data-action="favorite" data-id="${id}" aria-pressed="${isFavorite}" aria-label="${favoriteLabel}" title="${favoriteLabel}">${favoriteIcon()}</button>
      <button class="recipe-open" type="button" data-action="view" data-id="${id}" aria-label="دیدن دستور ${title}">
        <span class="recipe-art recipe-art--${safePalette(recipe)}" aria-hidden="true">
          <span class="art-sprinkle one">✦</span><span class="food-emoji">${emoji}</span><span class="art-sprinkle two">✳</span>
          <span class="card-category">${category}</span>
        </span>
        <span class="recipe-card-body">
          <span class="recipe-title">${title}</span>
          <span class="recipe-description">${description}</span>
          <span class="recipe-meta">
            <span class="meta-group"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.6"/><path d="M12 7v5l3 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>${numberFa(recipe.time)} دقیقه</span>
            <span class="difficulty ${difficultyClass}">${escapeHTML(recipe.difficulty || "آسان")}</span>
          </span>
        </span>
      </button>
    </li>
  `;
}

function renderRecipes() {
  const recipes = allRecipes();
  const validIds = new Set(recipes.map((recipe) => recipe.id));
  favoriteIds = new Set([...favoriteIds].filter((id) => validIds.has(id)));

  const query = normalizeSearch(searchInput.value);
  const visibleRecipes = recipes.filter((recipe) => {
    const matchesCategory = activeCategory === "همه" || recipe.category === activeCategory;
    const matchesFavorite = !favoritesOnly || favoriteIds.has(recipe.id);
    const searchText = normalizeSearch([recipe.title, recipe.category, recipe.description, ...(recipe.ingredients || [])].join(" "));
    const matchesSearch = !query || searchText.includes(query);
    return matchesCategory && matchesFavorite && matchesSearch;
  });

  recipeCount.textContent = numberFa(recipes.length);
  favoriteCount.textContent = numberFa(favoriteIds.size);
  favoriteFilterCount.textContent = numberFa(favoriteIds.size);
  favoritesFilter.setAttribute("aria-pressed", String(favoritesOnly));
  recipeGrid.innerHTML = visibleRecipes.map(renderRecipeCard).join("");
  resultsStatus.textContent = visibleRecipes.length
    ? `${numberFa(visibleRecipes.length)} دستور نمایش داده می‌شود.`
    : "دستوری با این فیلترها پیدا نشد.";
  emptyState.hidden = visibleRecipes.length > 0;

  if (visibleRecipes.length === 0) {
    if (favoritesOnly && favoriteIds.size === 0) {
      emptyTitle.textContent = "هنوز چیزی را نپسندیده‌ای";
      emptyDescription.textContent = "برای نگه‌داشتن یک دستور، روی ستاره‌ی گوشه‌ی کارت بزن.";
    } else {
      emptyTitle.textContent = "چیزی پیدا نشد";
      emptyDescription.textContent = "عبارت دیگری را جست‌وجو کن یا فیلترها را پاک کن.";
    }
  }
}

function renderDetail(recipe) {
  if (!recipe) return;
  currentRecipeId = recipe.id;
  const isFavorite = favoriteIds.has(recipe.id);
  const emoji = escapeHTML(recipe.emoji || "🍽️");
  const ingredients = (recipe.ingredients || []).map((item) => `
    <li><label><input type="checkbox"><span>${escapeHTML(item)}</span></label></li>
  `).join("");
  const steps = (recipe.steps || []).map((step, index) => `<li data-step="${numberFa(index + 1)}"><span>${escapeHTML(step)}</span></li>`).join("");
  const favoriteLabel = isFavorite ? "برداشتن از پسندیده‌ها" : "افزودن به پسندیده‌ها";
  const customActions = recipe.custom ? `
    <button class="small-action delete-action" type="button" data-action="delete" data-id="${escapeHTML(recipe.id)}">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M10 11v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      حذف دستور
    </button>
  ` : "";

  detailContent.innerHTML = `
    <article class="detail-sheet">
      <div class="detail-hero recipe-art--${safePalette(recipe)}" aria-hidden="true"><span class="food-emoji">${emoji}</span><span class="art-sprinkle one">✦</span><span class="art-sprinkle two">✳</span></div>
      <div class="detail-body">
        <div class="detail-topline">
          <div><p class="eyebrow">${escapeHTML(recipe.category)} · مناسب برای ${numberFa(recipe.servings || 4)} نفر</p><h2 id="detail-recipe-title">${escapeHTML(recipe.title)}</h2></div>
          <button class="favorite-button detail-favorite" type="button" data-action="favorite" data-id="${escapeHTML(recipe.id)}" aria-pressed="${isFavorite}" aria-label="${favoriteLabel}" title="${favoriteLabel}">${favoriteIcon()}</button>
        </div>
        <p class="detail-description">${escapeHTML(recipe.description || "یک دستور خانگیِ دوست‌داشتنی.")}</p>
        <div class="detail-facts">
          <span class="detail-fact"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.6"/><path d="M12 7v5l3 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>${numberFa(recipe.time)} دقیقه</span>
          <span class="detail-fact"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="8" r="3" stroke="currentColor" stroke-width="1.6"/><path d="M3.5 19v-1.2A4.8 4.8 0 0 1 8.3 13h1.4a4.8 4.8 0 0 1 4.8 4.8V19M16 5.4a3 3 0 0 1 0 5.8m1.7 2.1a4.8 4.8 0 0 1 2.8 4.4V19" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>${numberFa(recipe.servings || 4)} نفر</span>
          <span class="detail-fact">${escapeHTML(recipe.difficulty || "آسان")}</span>
        </div>
        <div class="detail-columns">
          <section aria-labelledby="ingredients-heading"><h3 id="ingredients-heading">مواد لازم <span>· برای تیک‌زدن هنگام آماده‌سازی</span></h3><ul class="ingredient-list">${ingredients}</ul></section>
          <section aria-labelledby="steps-heading"><h3 id="steps-heading">روش پخت</h3><ol class="steps-list">${steps}</ol></section>
        </div>
        <div class="detail-footer">
          <span class="detail-footer-note">یک نفس عمیق، یک قابلمه‌ی گرم؛ نوش جان!</span>
          <div class="detail-actions">
            <button class="small-action" type="button" data-action="print"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 8V4h10v4M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M7 14h10v6H7z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M17.5 11.5h.01" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>چاپ دستور</button>
            ${customActions}
          </div>
        </div>
      </div>
    </article>
  `;
}

function toggleFavorite(id) {
  if (favoriteIds.has(id)) {
    favoriteIds.delete(id);
    showToast("از پسندیده‌ها برداشته شد.");
  } else {
    favoriteIds.add(id);
    showToast("به پسندیده‌ها اضافه شد.");
  }
  writeJSON(STORAGE_KEYS.favorites, [...favoriteIds]);
  renderRecipes();
  if (detailDialog.open && currentRecipeId === id) {
    const detailFavoriteButton = detailContent.querySelector(".detail-favorite");
    const isFavorite = favoriteIds.has(id);
    const label = isFavorite ? "برداشتن از پسندیده‌ها" : "افزودن به پسندیده‌ها";
    if (detailFavoriteButton) {
      detailFavoriteButton.setAttribute("aria-pressed", String(isFavorite));
      detailFavoriteButton.setAttribute("aria-label", label);
      detailFavoriteButton.title = label;
    }
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2800);
}

function setTheme(theme, persist = false) {
  const nextTheme = theme === "dark" ? "dark" : "light";
  const isDark = nextTheme === "dark";
  document.documentElement.dataset.theme = nextTheme;
  document.documentElement.style.colorScheme = nextTheme;
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", isDark ? "فعال‌کردن تم روشن" : "فعال‌کردن تم تاریک");
  themeToggle.title = isDark ? "تغییر به تم روشن" : "تغییر به تم تاریک";
  themeToggleLabel.textContent = isDark ? "روشن" : "تیره";
  if (themeColorMeta) themeColorMeta.setAttribute("content", isDark ? "#121813" : "#f7f5ef");

  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEYS.theme, nextTheme);
    } catch (_error) {
      showToast("تم تغییر کرد، اما مرورگر امکان ذخیره‌ی انتخاب را نداد.");
    }
  }
}

function openAddDialog() {
  addDialog.showModal();
  window.setTimeout(() => recipeForm.elements.title.focus(), 60);
}

function closeDialog(dialogId) {
  const dialog = document.getElementById(dialogId);
  if (dialog && dialog.open) dialog.close();
}

function resetFilters() {
  activeCategory = "همه";
  favoritesOnly = false;
  searchInput.value = "";
  document.querySelectorAll("[data-category-filter]").forEach((button) => {
    const isActive = button.dataset.categoryFilter === "همه";
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  renderRecipes();
}

function removeCustomRecipe(id) {
  const recipe = customRecipes.find((item) => item.id === id);
  if (!recipe) return;
  const confirmed = window.confirm(`دستور «${recipe.title}» از دفترچه‌ی همین مرورگر حذف شود؟`);
  if (!confirmed) return;
  customRecipes = customRecipes.filter((item) => item.id !== id);
  favoriteIds.delete(id);
  const recipesSaved = writeJSON(STORAGE_KEYS.recipes, customRecipes);
  const favoritesSaved = writeJSON(STORAGE_KEYS.favorites, [...favoriteIds]);
  closeDialog("detail-dialog");
  renderRecipes();
  showToast(recipesSaved && favoritesSaved ? "دستور حذف شد." : "دستور از صفحه حذف شد، اما تغییرها در این مرورگر ذخیره نشدند.");
}

function downloadBackup() {
  const backup = {
    app: "gh-pages-cooking-notebook",
    version: 1,
    exportedAt: new Date().toISOString(),
    recipes: customRecipes,
    favorites: [...favoriteIds]
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "daftarche-ashpazi-backup.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
  showToast("نسخه‌ی پشتیبان دانلود شد.");
}

async function restoreBackup(file) {
  try {
    if (file.size > 2 * 1024 * 1024) throw new Error("حجم فایل پشتیبان از ۲ مگابایت بیشتر است.");
    const data = JSON.parse(await file.text());
    if (!data || typeof data !== "object" || Array.isArray(data) || data.version !== 1 || !Array.isArray(data.recipes) || !Array.isArray(data.favorites)) {
      throw new Error("فرمت فایل پشتیبان شناخته نشد.");
    }
    const restoredRecipes = data.recipes.map(cleanRecipe).filter(Boolean);
    if (data.recipes.length > 0 && restoredRecipes.length === 0) {
      throw new Error("هیچ دستور معتبری در فایل پیدا نشد.");
    }
    const confirmed = window.confirm("بازیابی پشتیبان، دستورهای شخصی و فهرست پسندیده‌های فعلی را جایگزین می‌کند. ادامه می‌دهی؟");
    if (!confirmed) return;
    customRecipes = restoredRecipes;
    const validIds = new Set([...sampleRecipes, ...customRecipes].map((recipe) => recipe.id));
    favoriteIds = new Set(data.favorites.filter((id) => typeof id === "string" && validIds.has(id)));
    const recipesSaved = writeJSON(STORAGE_KEYS.recipes, customRecipes);
    const favoritesSaved = writeJSON(STORAGE_KEYS.favorites, [...favoriteIds]);
    resetFilters();
    closeDialog("detail-dialog");
    showToast(recipesSaved && favoritesSaved ? "پشتیبان با موفقیت بازیابی شد." : "پشتیبان تا بستن این صفحه در دسترس است، اما مرورگر آن را ذخیره نکرد.");
  } catch (error) {
    showToast(error instanceof SyntaxError ? "فایل انتخاب‌شده JSON معتبر نیست." : (error.message || "بازیابی انجام نشد."));
  }
}

recipeGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const { action, id } = button.dataset;
  if (action === "favorite") {
    toggleFavorite(id);
  } else if (action === "view") {
    const recipe = allRecipes().find((item) => item.id === id);
    if (recipe) {
      renderDetail(recipe);
      detailDialog.showModal();
    }
  }
});

detailContent.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const { action, id } = button.dataset;
  if (action === "favorite") toggleFavorite(id);
  if (action === "print") window.print();
  if (action === "delete") removeCustomRecipe(id);
});

themeToggle.addEventListener("click", () => {
  setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark", true);
});

searchInput.addEventListener("input", renderRecipes);
favoritesFilter.addEventListener("click", () => {
  favoritesOnly = !favoritesOnly;
  renderRecipes();
});
document.querySelectorAll("[data-category-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.categoryFilter;
    document.querySelectorAll("[data-category-filter]").forEach((chip) => {
      const isActive = chip === button;
      chip.classList.toggle("is-active", isActive);
      chip.setAttribute("aria-pressed", String(isActive));
    });
    renderRecipes();
  });
});

document.querySelectorAll("[data-open-add]").forEach((button) => button.addEventListener("click", openAddDialog));
document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => closeDialog(button.dataset.close));
});
document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});

document.querySelector("#clear-filters").addEventListener("click", resetFilters);
document.querySelector("#backup-button").addEventListener("click", downloadBackup);
document.querySelector("#import-button").addEventListener("click", () => importFile.click());
importFile.addEventListener("change", async () => {
  const file = importFile.files && importFile.files[0];
  importFile.value = "";
  if (file) await restoreBackup(file);
});

recipeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(recipeForm);
  const category = String(formData.get("category"));
  const ingredients = String(formData.get("ingredients")).split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const steps = String(formData.get("steps")).split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const style = categoryArt[category] || categoryArt["غذای اصلی"];
  const recipe = cleanRecipe({
    id: makeId(),
    title: String(formData.get("title")).trim(),
    category,
    time: parseLocalizedNumber(formData.get("time")),
    servings: parseLocalizedNumber(formData.get("servings")),
    difficulty: "دست‌ساز",
    description: String(formData.get("description")).trim() || "یک دستور خانگیِ خودت؛ نوش جان!",
    emoji: style.emoji,
    palette: style.palette,
    ingredients,
    steps
  });
  if (!recipe) {
    showToast("نام غذا، مواد لازم و مراحل پخت را کامل کن.");
    return;
  }
  customRecipes.unshift(recipe);
  const saved = writeJSON(STORAGE_KEYS.recipes, customRecipes);
  recipeForm.reset();
  addDialog.close();
  resetFilters();
  showToast(saved ? "دستور تازه‌ات در همین مرورگر ذخیره شد." : "دستور فقط تا بستن این صفحه در دسترس می‌ماند؛ ذخیره‌سازی مرورگر فعال نیست.");
});

setTheme(document.documentElement.dataset.theme || "light");
renderRecipes();
