const API = 'https://cg-pathshala-production.up.railway.app/api';

let selectedMedium = 'hindi';
let selectedClass = null;
let selectedStream = null;
let selectedSubject = null;
let selectedContentType = null;

// ===== HINDI / ENGLISH TEXT =====
const txt = {
  hindi: {
    selectClass: 'अपनी कक्षा चुनें',
    selectStream: 'अपनी Stream चुनें',
    selectSubject: 'विषय चुनें',
    whatToRead: 'क्या पढ़ना है?',
    back: 'वापस',
    headerSub: 'CG Board | कक्षा 6 से 12 तक',
    navHome: 'होम', navClasses: 'कक्षा', navPapers: 'पेपर', navProfile: 'प्रोफाइल',
    classSub6_10: 'विषय',
    classSub11_12: 'Stream',
    subjects: {
      6:  ['हिंदी', 'English', 'गणित', 'विज्ञान', 'सामाजिक विज्ञान', 'संस्कृत'],
      7:  ['हिंदी', 'English', 'गणित', 'विज्ञान', 'सामाजिक विज्ञान', 'संस्कृत'],
      8:  ['हिंदी', 'English', 'गणित', 'विज्ञान', 'सामाजिक विज्ञान', 'संस्कृत'],
      9:  ['हिंदी', 'English', 'गणित', 'विज्ञान', 'सामाजिक विज्ञान', 'संस्कृत'],
      10: ['हिंदी', 'English', 'गणित', 'विज्ञान', 'सामाजिक विज्ञान', 'संस्कृत'],
    },
    streamSubjects: {
      science:     ['हिंदी', 'English', 'गणित', 'भौतिकी', 'रसायन विज्ञान', 'जीव विज्ञान'],
      commerce:    ['हिंदी', 'English', 'गणित', 'अर्थशास्त्र', 'लेखाशास्त्र', 'व्यवसाय अध्ययन'],
      arts:        ['हिंदी', 'English', 'इतिहास', 'भूगोल', 'राजनीति विज्ञान', 'समाजशास्त्र'],
      agriculture: ['हिंदी', 'English', 'पशुपालन', 'फसल उत्पादन', 'कृषि विज्ञान के तत्व'],
    },
    streams: [
      { id: 'science',     icon: '🔬', label: 'Science (विज्ञान)',       color: '#2196F3' },
      { id: 'commerce',    icon: '📊', label: 'Commerce (वाणिज्य)',      color: '#FF9800' },
      { id: 'arts',        icon: '🎨', label: 'Arts (कला)',              color: '#9C27B0' },
      { id: 'agriculture', icon: '🌾', label: 'Agriculture (कृषि)',      color: '#4CAF50' },
    ],
    contentTypes: [
      { id: 'notes', icon: '📝', label: 'Notes (नोट्स)',         sub: 'Chapter-wise नोट्स',    color: '#4CAF50' },
      { id: 'pdf',   icon: '📄', label: 'PDF Books (किताब)',     sub: 'पूरी किताब PDF में',    color: '#2196F3' },
      { id: 'pyq',   icon: '📋', label: 'PYQ Papers',            sub: 'पिछले साल के paper',    color: '#FF5722' },
      { id: 'mcq',   icon: '✅', label: 'MCQ Practice',          sub: 'बहुविकल्पीय प्रश्न',  color: '#9C27B0' },
      { id: 'video', icon: '▶️', label: 'Video Solutions',       sub: 'YouTube पर देखो',       color: '#F44336' },
      { id: 'imp',   icon: '⭐', label: 'Imp Questions',         sub: 'महत्वपूर्ण प्रश्न',    color: '#FF9800' },
    ],
    emptyMsg: 'अभी कोई content नहीं है 📭',
    loadingMsg: 'लोड हो रहा है...',
    classSuffix: 'वीं',
    subjectLabel: 'विषय',
    chapterLabel: 'अध्याय',
  },

  english: {
    selectClass: 'Select Your Class',
    selectStream: 'Select Your Stream',
    selectSubject: 'Select Subject',
    whatToRead: 'What to Study?',
    back: 'Back',
    headerSub: 'CG Board | Class 6 to 12',
    navHome: 'Home', navClasses: 'Classes', navPapers: 'Papers', navProfile: 'Profile',
    classSub6_10: 'Subjects',
    classSub11_12: 'Streams',
    subjects: {
      6:  ['Hindi', 'English', 'Mathematics', 'Science', 'Social Science', 'Sanskrit'],
      7:  ['Hindi', 'English', 'Mathematics', 'Science', 'Social Science', 'Sanskrit'],
      8:  ['Hindi', 'English', 'Mathematics', 'Science', 'Social Science', 'Sanskrit'],
      9:  ['Hindi', 'English', 'Mathematics', 'Science', 'Social Science', 'Sanskrit'],
      10: ['Hindi', 'English', 'Mathematics', 'Science', 'Social Science', 'Sanskrit'],
    },
    streamSubjects: {
      science:     ['Hindi', 'English', 'Mathematics', 'Physics', 'Chemistry', 'Biology'],
      commerce:    ['Hindi', 'English', 'Mathematics', 'Economics', 'Accountancy', 'Business Studies'],
      arts:        ['Hindi', 'English', 'History', 'Geography', 'Political Science', 'Sociology'],
      agriculture: ['Hindi', 'English', 'Animal Husbandry', 'Crop Production', 'Elements of Agriculture Science'],
    },
    streams: [
      { id: 'science',     icon: '🔬', label: 'Science',     color: '#2196F3' },
      { id: 'commerce',    icon: '📊', label: 'Commerce',    color: '#FF9800' },
      { id: 'arts',        icon: '🎨', label: 'Arts',        color: '#9C27B0' },
      { id: 'agriculture', icon: '🌾', label: 'Agriculture', color: '#4CAF50' },
    ],
    contentTypes: [
      { id: 'notes', icon: '📝', label: 'Notes',           sub: 'Chapter-wise notes',     color: '#4CAF50' },
      { id: 'pdf',   icon: '📄', label: 'PDF Books',       sub: 'Full book in PDF',       color: '#2196F3' },
      { id: 'pyq',   icon: '📋', label: 'PYQ Papers',      sub: 'Previous year papers',   color: '#FF5722' },
      { id: 'mcq',   icon: '✅', label: 'MCQ Practice',    sub: 'Multiple choice Qs',     color: '#9C27B0' },
      { id: 'video', icon: '▶️', label: 'Video Solutions', sub: 'Watch on YouTube',       color: '#F44336' },
      { id: 'imp',   icon: '⭐', label: 'Imp Questions',   sub: 'Important questions',    color: '#FF9800' },
    ],
    emptyMsg: 'No content available yet 📭',
    loadingMsg: 'Loading...',
    classSuffix: '',
    subjectLabel: 'Subject',
    chapterLabel: 'Chapter',
  }
};

const subjectIcons = {
  // Hindi names
  'हिंदी': '📖', 'English': '🔤', 'गणित': '🔢', 'विज्ञान': '🔬',
  'सामाजिक विज्ञान': '🌍', 'संस्कृत': '🕉️', 'भौतिकी': '⚡',
  'रसायन विज्ञान': '⚗️', 'जीव विज्ञान': '🌿', 'इतिहास': '🏛️',
  'भूगोल': '🗺️', 'अर्थशास्त्र': '📊', 'लेखाशास्त्र': '📒',
  'व्यवसाय अध्ययन': '💼', 'राजनीति विज्ञान': '⚖️',
  'समाजशास्त्र': '👥', 'कृषि विज्ञान': '🌾',
  'पशुपालन': '🐄', 'फसल उत्पादन': '🌱', 'कृषि विज्ञान के तत्व': '🧑‍🌾',
  // English names
  'Hindi': '📖', 'Mathematics': '🔢', 'Science': '🔬',
  'Social Science': '🌍', 'Sanskrit': '🕉️', 'Physics': '⚡',
  'Chemistry': '⚗️', 'Biology': '🌿', 'History': '🏛️',
  'Geography': '🗺️', 'Economics': '📊', 'Accountancy': '📒',
  'Business Studies': '💼', 'Political Science': '⚖️',
  'Sociology': '👥', 'Agriculture Science': '🌾',
  'Animal Husbandry': '🐄', 'Crop Production': '🌱',
  'Elements of Agriculture Science': '🧑‍🌾',
};

const classEmojis = ['📗','📗','📗','📘','📘','📙','📙'];

// ===== SHOW SCREEN =====
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ===== MEDIUM CHOOSE =====
function chooseMedium(med) {
  selectedMedium = med;
  const t = txt[med];
   renderClasses();
  showScreen('home-screen');


  // Header update
  document.getElementById('main-header').style.display = 'block';
  document.getElementById('header-sub').textContent = t.headerSub;
  document.getElementById('bottom-nav').style.display = 'flex';

  // Nav labels
  document.getElementById('nav-home').textContent = t.navHome;
  document.getElementById('nav-classes').textContent = t.navClasses;
  document.getElementById('nav-profile').textContent = t.navProfile;

  // Back buttons
  document.querySelectorAll('[id^="txt-back-"]').forEach(el => el.textContent = t.back);

  // Render classes
  renderClasses();
  showScreen('home-screen');
}

// ===== RENDER CLASSES =====
function renderClasses() {
  const t = txt[selectedMedium];
  document.getElementById('txt-select-class').textContent = t.selectClass;
  const grid = document.getElementById('class-grid');
  grid.innerHTML = '';
  [6,7,8,9,10,11,12].forEach((cls, i) => {
    const sub = (cls === 11 || cls === 12) ? t.classSub11_12 : t.classSub6_10;
    const label = selectedMedium === 'hindi' ? `कक्षा ${cls}` : `Class ${cls}`;
    grid.innerHTML += `
      <div class="class-card" onclick="selectClass(${cls})">
        <span class="class-emoji">${classEmojis[i]}</span>
        <div class="class-label">${label}</div>
        <div class="class-sub">${sub}</div>
      </div>`;
  });
}

// ===== SELECT CLASS =====
function selectClass(cls) {
  selectedClass = cls;
  selectedStream = null;
  const t = txt[selectedMedium];

  if (cls === 11 || cls === 12) {
    const label = selectedMedium === 'hindi' ? `कक्षा ${cls} — ${t.selectStream}` : `Class ${cls} — ${t.selectStream}`;
    document.getElementById('stream-title').textContent = label;
    renderStreams();
    showScreen('stream-screen');
  } else {
    const label = selectedMedium === 'hindi' ? `कक्षा ${cls} — ${t.selectSubject}` : `Class ${cls} — ${t.selectSubject}`;
    document.getElementById('subject-title').textContent = label;
    renderSubjects(t.subjects[cls]);
    showScreen('subject-screen');
  }
}

// ===== RENDER STREAMS =====
function renderStreams() {
  const t = txt[selectedMedium];
  const grid = document.getElementById('stream-grid');
  grid.innerHTML = '';
  t.streams.forEach(stream => {
    const subCount = t.streamSubjects[stream.id].length;
    const subLabel = selectedMedium === 'hindi' ? `${subCount} विषय` : `${subCount} Subjects`;
    grid.innerHTML += `
      <div class="stream-card" onclick="selectStream('${stream.id}')" style="border-color: ${stream.color}40">
        <div class="stream-icon" style="background: ${stream.color}15">${stream.icon}</div>
        <div class="stream-name">${stream.label}</div>
        <div class="stream-sub" style="color: ${stream.color}">${subLabel}</div>
      </div>`;
  });
}

// ===== SELECT STREAM =====
function selectStream(streamId) {
  selectedStream = streamId;
  const t = txt[selectedMedium];
  const stream = t.streams.find(s => s.id === streamId);
  const label = selectedMedium === 'hindi'
    ? `कक्षा ${selectedClass} ${stream.label} — ${t.selectSubject}`
    : `Class ${selectedClass} ${stream.label} — ${t.selectSubject}`;
  document.getElementById('subject-title').textContent = label;
  renderSubjects(t.streamSubjects[streamId]);
  showScreen('subject-screen');
}

// ===== RENDER SUBJECTS =====
function renderSubjects(subList) {
  const grid = document.getElementById('subject-grid');
  grid.innerHTML = '';
  subList.forEach(sub => {
    grid.innerHTML += `
      <div class="subject-card" onclick="selectSubject('${sub}')">
        <span class="icon">${subjectIcons[sub] || '📘'}</span>
        <div>${sub}</div>
      </div>`;
  });
}

// ===== SELECT SUBJECT =====
function selectSubject(sub) {
  selectedSubject = sub;
  const t = txt[selectedMedium];
  const classLabel = selectedMedium === 'hindi' ? `कक्षा ${selectedClass}` : `Class ${selectedClass}`;
  const medLabel = selectedMedium === 'hindi' ? 'हिंदी माध्यम' : 'English Medium';

  // Subject info card
  document.getElementById('subject-info-card').innerHTML = `
    <div class="sic-icon">${subjectIcons[sub] || '📘'}</div>
    <div>
      <div class="sic-name">${sub}</div>
      <div class="sic-sub">${classLabel} • ${medLabel}</div>
    </div>`;

 document.getElementById('txt-what-to-read').textContent = t.whatToRead;
  renderContentTypes();
  showScreen('content-screen');
}

// ===== SELECT CONTENT TYPE =====
async function selectContentType(type, label, icon) {
  selectedContentType = type;
  document.getElementById('section-title').textContent = label;
  showScreen('section-screen');
  await loadContent(type, icon);
}

// ===== RENDER CONTENT TYPES =====
function renderContentTypes() {
  const t = txt[selectedMedium];
  const grid = document.getElementById('content-grid');
  grid.innerHTML = '';
  t.contentTypes.forEach(ct => {
    grid.innerHTML += `
      <div class="content-card" onclick="selectContentType('${ct.id}', '${ct.label}', '${ct.icon}')" style="border-color: ${ct.color}25">
        <span class="icon">${ct.icon}</span>
        <div class="ct-name" style="color: ${ct.color}">${ct.label}</div>
        <div class="ct-sub">${ct.sub}</div>
      </div>`;
  });
}

async function loadContent(type, icon) {
  const t = txt[selectedMedium];
  const list = document.getElementById('content-list');
  list.innerHTML = `<p style="text-align:center;color:#999;margin-top:30px">${t.loadingMsg}</p>`;

  try {
    const res = await fetch(`${API}/content?class=${selectedClass}&subject=${selectedSubject}&medium=${selectedMedium}&contentType=${type}`);
    const data = await res.json();

    if (!data.data || data.data.length === 0) {
      list.innerHTML = `
        <div class="empty-state">
          <span>📭</span>
          <p>${t.emptyMsg}</p>
        </div>`;
      return;
    }

    const typeColors = {
      notes: '#4CAF50', pdf: '#2196F3', pyq: '#FF5722',
      mcq: '#9C27B0', video: '#F44336', imp: '#FF9800'
    };

    list.innerHTML = '';
    window._links = [];
    window._titles = [];
    data.data.forEach((item, index) => {
      window._links[index] = item.pdfUrl;
      window._titles[index] = item.title;
      const color = typeColors[item.contentType] || '#999';
      const isSaved = isBookmarked(item._id);
      
      list.innerHTML += `
        <div class="list-item" onclick="openPDF(${index})">
          <div class="item-icon" style="background:${color}15">${icon}</div>
          <div class="item-text">
            <h4>${item.title}</h4>
            <p>${t.chapterLabel} ${item.chapter} • ${item.chapterName}</p>
          </div>
          <button class="share-btn"
            onclick="openShareModal('${item.title}', '${item.subject}', ${item.class}, ${item.chapter})"
            title="Share">
            📤
          </button>
          <button class="save-btn ${isSaved ? 'saved' : ''}"
            onclick="toggleBookmark(event, '${item._id}', '${item.title}', '${item.contentType}', '${icon}', '${item.subject}', ${item.class}, ${item.chapter}, ${index})"
            title="${isSaved ? 'Saved!' : 'Save करो'}">
            ${isSaved ? '🔖' : '🏷️'}
          </button>
          <div class="item-arrow">→</div>
        </div>`;
    });
  } catch (err) {
    list.innerHTML = `<p style="text-align:center;color:red;margin-top:20px">Error loading content!</p>`;
  }
}

// ===== GO BACK =====
function goBack(from) {
  if (from === 'search') {
    showScreen('home-screen');
  } else if (from === 'stream') {
    showScreen('home-screen');
  } else if (from === 'subject') {
    if (selectedClass === 11 || selectedClass === 12) {
      showScreen('stream-screen');
    } else {
      showScreen('home-screen');
    }
  } else if (from === 'content') {
    showScreen('subject-screen');
  } else if (from === 'section') {
    showScreen('content-screen');
  }
}
// ===== SEARCH FEATURE =====
let searchTimeout = null;

function openSearch() {
  // Clear search directly
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  if (searchInput) searchInput.value = '';
  if (searchResults) searchResults.innerHTML = `
    <div class="search-empty">
      <span>🔍</span>
      <p id="txt-search-hint">${selectedMedium === 'hindi' ? 'कुछ भी type करो...' : 'Type anything...'}</p>
    </div>`;

  if (searchInput) searchInput.placeholder =
    selectedMedium === 'hindi' ? 'कोई भी topic खोजें...' : 'Search any topic...';

  showScreen('search-screen');
  setTimeout(() => { if (searchInput) searchInput.focus(); }, 100);
}
async function doSearch(query) {
  clearTimeout(searchTimeout);
  const resultsEl = document.getElementById('search-results');

  if (!query || query.length < 2) {
    clearSearch();
    return;
  }

  resultsEl.innerHTML = `<p style="text-align:center;color:#999;padding:20px">
    ${selectedMedium === 'hindi' ? 'खोज रहे हैं...' : 'Searching...'}
  </p>`;

  searchTimeout = setTimeout(async () => {
    try {
      const res = await fetch(`${API}/content/search?q=${encodeURIComponent(query)}&medium=${selectedMedium}`);
      const data = await res.json();

      if (!data.data || data.data.length === 0) {
        resultsEl.innerHTML = `
          <div class="search-empty">
            <span>😔</span>
            <p>${selectedMedium === 'hindi' ? 'कोई result नहीं मिला' : 'No results found'}</p>
          </div>`;
        return;
      }

      const typeColors = {
        notes: '#4CAF50', pdf: '#2196F3', pyq: '#FF5722',
        mcq: '#9C27B0', video: '#F44336', imp: '#FF9800'
      };
      const typeIcons = {
        notes: '📝', pdf: '📄', pyq: '📋',
        mcq: '✅', video: '▶️', imp: '⭐'
      };

      resultsEl.innerHTML = `<p style="font-size:13px;color:#999;margin-bottom:14px">
        ${data.data.length} ${selectedMedium === 'hindi' ? 'results मिले' : 'results found'}
      </p>`;

      data.data.forEach(item => {
        const color = typeColors[item.contentType] || '#999';
        const icon = typeIcons[item.contentType] || '📄';
        const classLabel = selectedMedium === 'hindi' ? `कक्षा ${item.class}` : `Class ${item.class}`;
        const chapterLabel = selectedMedium === 'hindi' ? `अध्याय ${item.chapter}` : `Chapter ${item.chapter}`;

        resultsEl.innerHTML += `
          <div class="search-result-item" onclick="openSearchResult('${item._id}', '${item.contentType}', '${item.subject}', ${item.class})">
            <div class="search-result-title">${icon} ${item.title}</div>
            <div class="search-result-meta">
              <span>${classLabel} • ${item.subject}</span>
              <span>${chapterLabel}</span>
              <span class="search-result-badge" style="background:${color}20;color:${color}">
                ${item.contentType.toUpperCase()}
              </span>
            </div>
          </div>`;
      });

    } catch (err) {
      resultsEl.innerHTML = `<p style="text-align:center;color:red;padding:20px">❌ Error!</p>`;
    }
  }, 500);
}

function openSearchResult(id, type, subject, cls) {
  selectedClass = cls;
  selectedSubject = subject;
  const t = txt[selectedMedium];
  const ct = t.contentTypes.find(c => c.id === type);
  if (ct) {
    document.getElementById('section-title').textContent = ct.label;
    showScreen('section-screen');
    loadContent(type, ct.icon);
  }
}
// ===== BOOKMARK FEATURE =====
const typeColors = {
  notes: '#4CAF50', pdf: '#2196F3', pyq: '#FF5722',
  mcq: '#9C27B0', video: '#F44336', imp: '#FF9800'
};

const typeIcons = {
  notes: '📝', pdf: '📄', pyq: '📋',
  mcq: '✅', video: '▶️', imp: '⭐'
};

// LocalStorage से bookmarks लाओ
function getBookmarks() {
  const bm = localStorage.getItem('cgpathshala_bookmarks');
  return bm ? JSON.parse(bm) : [];
}

// Bookmark save करो
function saveBookmarks(bookmarks) {
  localStorage.setItem('cgpathshala_bookmarks', JSON.stringify(bookmarks));
}

// Check करो bookmark है या नहीं
function isBookmarked(id) {
  return getBookmarks().some(b => b.id === id);
}

// Bookmark toggle करो
function toggleBookmark(event, id, title, type, icon, subject, cls, chapter, linkIndex) {
  event.stopPropagation();
  const bookmarks = getBookmarks();
  const index = bookmarks.findIndex(b => b.id === id);

  if (index === -1) {
    // Add bookmark
    bookmarks.push({ id, title, type, icon, subject, class: cls, chapter, pdfUrl: window._links[linkIndex], savedAt: new Date().toISOString() });
    saveBookmarks(bookmarks);
    event.target.textContent = '🔖';
    event.target.classList.add('saved');
    showToast(selectedMedium === 'hindi' ? '🔖 Saved!' : '🔖 Saved!');
  } else {
    // Remove bookmark
    bookmarks.splice(index, 1);
    saveBookmarks(bookmarks);
    event.target.textContent = '🏷️';
    event.target.classList.remove('saved');
    showToast(selectedMedium === 'hindi' ? '🗑️ हटाया गया' : '🗑️ Removed');
  }
}

// Bookmarks screen खोलो
function openBookmarks() {
  const t = txt[selectedMedium];
  document.getElementById('txt-bookmark-title').textContent =
    selectedMedium === 'hindi' ? '🔖 Saved Content' : '🔖 Saved Content';

  // Tab labels update
  document.getElementById('bm-all').textContent = selectedMedium === 'hindi' ? 'सभी' : 'All';

  showScreen('bookmark-screen');
  filterBookmarks('all');
}

// Filter bookmarks by type
function filterBookmarks(type) {
  // Active tab update
  document.querySelectorAll('.bm-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(`bm-${type === 'all' ? 'all' : type}`).classList.add('active');

  const bookmarks = getBookmarks();
  const filtered = type === 'all' ? bookmarks : bookmarks.filter(b => b.type === type);
  const listEl = document.getElementById('bookmark-list');

  if (filtered.length === 0) {
    listEl.innerHTML = `
      <div class="bm-empty">
        <span>🔖</span>
        <p>${selectedMedium === 'hindi' ? 'अभी कोई saved content नहीं है' : 'No saved content yet'}</p>
      </div>`;
    return;
  }

  // Group by type
  const groups = {};
  filtered.forEach(item => {
    if (!groups[item.type]) groups[item.type] = [];
    groups[item.type].push(item);
  });

  listEl.innerHTML = '';

  Object.keys(groups).forEach(grpType => {
    const color = typeColors[grpType] || '#999';
    const icon = typeIcons[grpType] || '📄';
    const label = grpType.toUpperCase();

    // Section header
    listEl.innerHTML += `
      <div style="font-weight:700;font-size:13px;color:${color};margin:16px 0 8px;display:flex;align-items:center;gap:6px">
        <span>${icon}</span> ${label}
        <span style="background:${color}20;color:${color};padding:2px 8px;border-radius:20px;font-size:11px">${groups[grpType].length}</span>
      </div>`;

    groups[grpType].forEach(item => {
      const classLabel = selectedMedium === 'hindi' ? `कक्षा ${item.class}` : `Class ${item.class}`;
      const chapterLabel = selectedMedium === 'hindi' ? `अध्याय ${item.chapter}` : `Chapter ${item.chapter}`;

      listEl.innerHTML += `
        <div class="bookmark-item" onclick="openPDFFromBookmark('${item.pdfUrl}')">
          <div class="bm-icon" style="background:${color}15">${icon}</div>
          <div class="bm-text">
            <div class="bm-title">${item.title}</div>
            <div class="bm-meta">${classLabel} • ${item.subject} • ${chapterLabel}</div>
          </div>
          <button class="bm-delete" onclick="removeBookmark('${item.id}')">🗑️</button>
        </div>`;
    });
  });

  // Total count
  listEl.innerHTML += `<p style="color:#999;font-size:12px;text-align:center;margin-top:14px">
    ${selectedMedium === 'hindi' ? `कुल ${filtered.length} saved` : `Total ${filtered.length} saved`}
  </p>`;
}

// Bookmark delete करो
function removeBookmark(id) {
  const bookmarks = getBookmarks();
  const updated = bookmarks.filter(b => b.id !== id);
  saveBookmarks(updated);
  filterBookmarks('all');
  showToast(selectedMedium === 'hindi' ? '🗑️ हटाया गया' : '🗑️ Removed');
}

// Toast notification
function showToast(msg) {
  const existing = document.getElementById('toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.style.cssText = `
    position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%);
    background: #333; color: white; padding: 10px 20px; border-radius: 20px;
    font-size: 13px; font-weight: 600; z-index: 999;
    animation: fadeUp 0.3s ease;`;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}
// ===== SHARE FEATURE =====
let shareData = {};

function openShareModal(title, subject, cls, chapter) {
  const classLabel = selectedMedium === 'hindi' ? `कक्षा ${cls}` : `Class ${cls}`;
  const chapterLabel = selectedMedium === 'hindi' ? `अध्याय ${chapter}` : `Chapter ${chapter}`;

  shareData = {
    title: title,
    text: selectedMedium === 'hindi'
      ? `📚 CG Pathshala\n${classLabel} • ${subject}\n${chapterLabel}: ${title}\n\nCG Board की best study app!`
      : `📚 CG Pathshala\n${classLabel} • ${subject}\n${chapterLabel}: ${title}\n\nBest study app for CG Board!`,
    url: 'https://cgpathshala.app'
  };

  document.getElementById('share-modal-title').textContent =
    selectedMedium === 'hindi' ? '📤 Share करो' : '📤 Share';
  document.getElementById('txt-copy-link').textContent =
    selectedMedium === 'hindi' ? 'Link Copy करो' : 'Copy Link';
  document.getElementById('txt-share-close').textContent =
    selectedMedium === 'hindi' ? 'बंद करो' : 'Close';

  document.getElementById('share-modal').classList.add('active');
}

function closeShareModal() {
  document.getElementById('share-modal').classList.remove('active');
}
function shareWhatsApp() {
  Capacitor.Plugins.Share.share({
    title: shareData.title,
    text: `${shareData.text}\n${shareData.url}`,
    dialogTitle: 'Share via WhatsApp'
  });
  closeShareModal();
}

function shareTelegram() {
  Capacitor.Plugins.Share.share({
    title: shareData.title,
    text: `${shareData.text}\n${shareData.url}`,
    dialogTitle: 'Share via Telegram'
  });
  closeShareModal();
}

function copyLink() {
  const fullText = `${shareData.text}\n${shareData.url}`;
  navigator.clipboard.writeText(fullText).then(() => {
    showToast(selectedMedium === 'hindi' ? '✅ Copy हो गया!' : '✅ Copied!');
    closeShareModal();
  }).catch(() => {
    showToast('❌ Copy नहीं हुआ!');
  });
}
// ===== PROFILE FEATURE =====
function openProfile() {
  const t = txt[selectedMedium];
  const profile = getProfile();
  const bookmarks = getBookmarks();
  
  // Text update
  document.getElementById('txt-profile-title').textContent =
    selectedMedium === 'hindi' ? '👤 प्रोफाइल' : '👤 Profile';
  document.getElementById('txt-settings').textContent =
    selectedMedium === 'hindi' ? '⚙️ Settings' : '⚙️ Settings';
  document.getElementById('txt-change-medium').textContent =
    selectedMedium === 'hindi' ? 'Medium बदलो' : 'Change Medium';
  document.getElementById('txt-saved-content').textContent =
    selectedMedium === 'hindi' ? 'Saved Content' : 'Saved Content';
  document.getElementById('txt-clear-data').textContent =
    selectedMedium === 'hindi' ? 'सब Clear करो' : 'Clear All Data';
  document.getElementById('txt-clear-sub').textContent =
    selectedMedium === 'hindi' ? 'सभी saved data हटाओ' : 'Remove all saved data';
  document.getElementById('txt-edit').textContent = '✏️ Edit';

  // Profile data
  document.getElementById('profile-name-display').textContent = profile.name || 'Student';
  document.getElementById('profile-class-display').textContent = profile.class
    ? (selectedMedium === 'hindi' ? `कक्षा ${profile.class}` : `Class ${profile.class}`)
    : (selectedMedium === 'hindi' ? 'कक्षा चुनें' : 'Select Class');

  // Stats
  document.getElementById('stat-saved').textContent = bookmarks.length;
  document.getElementById('stat-medium').textContent = selectedMedium === 'hindi' ? 'हिंदी' : 'Eng';
  document.getElementById('stat-class').textContent = profile.class || '-';

  document.getElementById('txt-stat-saved').textContent = selectedMedium === 'hindi' ? 'Saved' : 'Saved';
  document.getElementById('txt-stat-medium').textContent = selectedMedium === 'hindi' ? 'माध्यम' : 'Medium';
  document.getElementById('txt-stat-class').textContent = selectedMedium === 'hindi' ? 'कक्षा' : 'Class';

  // Current medium
  document.getElementById('current-medium-display').textContent =
    selectedMedium === 'hindi' ? 'हिंदी माध्यम' : 'English Medium';

  // Saved count
  document.getElementById('saved-count-display').textContent =
    selectedMedium === 'hindi' ? `${bookmarks.length} items saved` : `${bookmarks.length} items saved`;

  showScreen('profile-screen');
}

// Profile get/save
function getProfile() {
  const p = localStorage.getItem('cgpathshala_profile');
  return p ? JSON.parse(p) : {};
}

function openEditProfile() {
  const profile = getProfile();
  document.getElementById('edit-name-input').value = profile.name || '';
  document.getElementById('edit-class-input').value = profile.class || '';
  document.getElementById('edit-profile-modal').classList.add('active');
}

function closeEditProfile() {
  document.getElementById('edit-profile-modal').classList.remove('active');
}

function saveProfile() {
  const name = document.getElementById('edit-name-input').value.trim();
  const cls = document.getElementById('edit-class-input').value;

  if (!name) {
    showToast(selectedMedium === 'hindi' ? '❌ नाम लिखो!' : '❌ Enter name!');
    return;
  }

  localStorage.setItem('cgpathshala_profile', JSON.stringify({ name, class: cls }));
  closeEditProfile();
  openProfile();
  showToast(selectedMedium === 'hindi' ? '✅ Profile save हो गई!' : '✅ Profile saved!');
}

function changeMedium() {
  if (confirm(selectedMedium === 'hindi'
    ? 'Medium बदलना है? App restart होगा।'
    : 'Change medium? App will restart.')) {
    showScreen('medium-screen');
    document.getElementById('main-header').style.display = 'none';
    document.getElementById('bottom-nav').style.display = 'none';
  }
}

function clearAllData() {
  if (confirm(selectedMedium === 'hindi'
    ? 'सभी saved data delete होगा। confirm करो?'
    : 'All saved data will be deleted. Confirm?')) {
    localStorage.removeItem('cgpathshala_bookmarks');
    localStorage.removeItem('cgpathshala_profile');
    showToast(selectedMedium === 'hindi' ? '🗑️ सब clear हो गया!' : '🗑️ All cleared!');
    openProfile();
  }
}
// ===== DARK MODE =====
function initDarkMode() {
  const isDark = localStorage.getItem('cgpathshala_darkmode') === 'true';
  if (isDark) {
    document.body.classList.add('dark');
    const toggle = document.getElementById('dark-toggle-switch');
    if (toggle) toggle.classList.add('on');
  }
}

function toggleDarkMode() {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('cgpathshala_darkmode', isDark);
  const toggle = document.getElementById('dark-toggle-switch');
  if (toggle) toggle.classList.toggle('on', isDark);
  showToast(isDark
    ? (selectedMedium === 'hindi' ? '🌙 Dark Mode ON' : '🌙 Dark Mode ON')
    : (selectedMedium === 'hindi' ? '☀️ Light Mode ON' : '☀️ Light Mode ON')
  );
}

// App शुरू होते ही Dark Mode check करो
initDarkMode();

function openPDF(index) {
  const url = window._links[index];
  const title = window._titles ? window._titles[index] : 'PDF';
  if (!url) {
    showToast('❌ Link नहीं मिली!');
    return;
  }
  
  // Google Drive/Docs link को embed URL में बदलो
  let embedUrl = url;
  if (url.includes('docs.google.com/document')) {
    const id = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (id) embedUrl = `https://docs.google.com/document/d/${id[1]}/preview`;
  } else if (url.includes('drive.google.com')) {
    const id = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (id) embedUrl = `https://drive.google.com/file/d/${id[1]}/preview`;
  }
  
  document.getElementById('pdf-title').textContent = title;
  document.getElementById('pdf-iframe').src = embedUrl;
  document.getElementById('main-header').style.display = 'none';
  document.getElementById('bottom-nav').style.display = 'none';
  showScreen('pdf-screen');
}

function closePDF() {
  document.getElementById('pdf-iframe').src = '';
  document.getElementById('main-header').style.display = 'block';
  document.getElementById('bottom-nav').style.display = 'flex';
  document.body.style.overflow = '';
  showScreen('section-screen');
}
function openPDFFromBookmark(url) {
  if (!url) {
    showToast('❌ Link नहीं मिली!');
    return;
  }

  let embedUrl = url;
  if (url.includes('docs.google.com/document')) {
    const id = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (id) embedUrl = `https://docs.google.com/document/d/${id[1]}/preview`;
  } else if (url.includes('drive.google.com')) {
    const id = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (id) embedUrl = `https://drive.google.com/file/d/${id[1]}/preview`;
  }

  document.getElementById('pdf-title').textContent = 'PDF';
  document.getElementById('pdf-iframe').src = embedUrl;
  document.getElementById('main-header').style.display = 'none';
  document.getElementById('bottom-nav').style.display = 'none';
  showScreen('pdf-screen');
}
// ===== ANDROID BACK BUTTON =====
window.handleBackButton = function() {
  const screens = ['section-screen', 'content-screen', 'subject-screen', 
                   'stream-screen', 'search-screen', 'bookmark-screen', 
                   'profile-screen', 'pdf-screen'];
  
  for (let screen of screens) {
    const el = document.getElementById(screen);
    if (el && el.classList.contains('active')) {
      if (screen === 'pdf-screen') closePDF();
      else if (screen === 'section-screen') goBack('section');
      else if (screen === 'content-screen') goBack('content');
      else if (screen === 'subject-screen') goBack('subject');
      else if (screen === 'stream-screen') goBack('stream');
      else if (screen === 'search-screen') goBack('search');
      else if (screen === 'bookmark-screen') showScreen('home-screen');
      else if (screen === 'profile-screen') showScreen('home-screen');
      return;
    }
  }
  
  // Home screen पर है तो app बंद करो
  if (document.getElementById('home-screen').classList.contains('active')) {
    navigator.app ? navigator.app.exitApp() : 
    getBridge ? getBridge().triggerWindowJSEvent('backbutton') : null;
  }
};