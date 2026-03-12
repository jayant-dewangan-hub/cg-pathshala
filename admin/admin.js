const API = 'http://localhost:5000/api';

const allSubjects = {
  6:  { hindi: ['हिंदी','English','गणित','विज्ञान','सामाजिक विज्ञान','संस्कृत'], english: ['Hindi','English','Mathematics','Science','Social Science','Sanskrit'] },
  7:  { hindi: ['हिंदी','English','गणित','विज्ञान','सामाजिक विज्ञान','संस्कृत'], english: ['Hindi','English','Mathematics','Science','Social Science','Sanskrit'] },
  8:  { hindi: ['हिंदी','English','गणित','विज्ञान','सामाजिक विज्ञान','संस्कृत'], english: ['Hindi','English','Mathematics','Science','Social Science','Sanskrit'] },
  9:  { hindi: ['हिंदी','English','गणित','विज्ञान','सामाजिक विज्ञान','संस्कृत'], english: ['Hindi','English','Mathematics','Science','Social Science','Sanskrit'] },
  10: { hindi: ['हिंदी','English','गणित','विज्ञान','सामाजिक विज्ञान','संस्कृत'], english: ['Hindi','English','Mathematics','Science','Social Science','Sanskrit'] },
};

const streamSubjects = {
  science:     { hindi: ['हिंदी','English','गणित','भौतिकी','रसायन विज्ञान','जीव विज्ञान'], english: ['Hindi','English','Mathematics','Physics','Chemistry','Biology'] },
  commerce:    { hindi: ['हिंदी','English','गणित','अर्थशास्त्र','लेखाशास्त्र','व्यवसाय अध्ययन'], english: ['Hindi','English','Mathematics','Economics','Accountancy','Business Studies'] },
  arts:        { hindi: ['हिंदी','English','इतिहास','भूगोल','राजनीति विज्ञान','समाजशास्त्र'], english: ['Hindi','English','History','Geography','Political Science','Sociology'] },
  agriculture: { hindi: ['हिंदी','English','पशुपालन','फसल उत्पादन','कृषि विज्ञान के तत्व'], english: ['Hindi','English','Animal Husbandry','Crop Production','Elements of Agriculture Science'] },
};

const typeColors = {
  notes: '#4CAF50', pdf: '#2196F3', pyq: '#FF5722',
  mcq: '#9C27B0', video: '#F44336', imp: '#FF9800'
};

// ===== TAB SWITCH =====
function showTab(tab) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.sidebar-item').forEach(s => s.classList.remove('active'));
  document.getElementById(`tab-${tab}`).classList.add('active');
  event.target.classList.add('active');
  if (tab === 'list') loadContentList();
}

// ===== UPDATE SUBJECTS (Add form) =====
function updateSubjects() {
  const cls = parseInt(document.getElementById('f-class').value);
  const medium = document.getElementById('f-medium').value;
  const streamGroup = document.getElementById('stream-group');
  const subjectSelect = document.getElementById('f-subject');

  if (cls === 11 || cls === 12) {
    streamGroup.style.display = 'block';
    const stream = document.getElementById('f-stream').value;
    if (stream && streamSubjects[stream]) {
      populateSubjects(subjectSelect, streamSubjects[stream][medium] || []);
    } else {
      subjectSelect.innerHTML = '<option value="">-- पहले Stream चुनें --</option>';
    }
  } else {
    streamGroup.style.display = 'none';
    if (allSubjects[cls]) {
      populateSubjects(subjectSelect, allSubjects[cls][medium] || []);
    } else {
      subjectSelect.innerHTML = '<option value="">-- पहले Class चुनें --</option>';
    }
  }
}

function populateSubjects(selectEl, subjects) {
  selectEl.innerHTML = '<option value="">-- विषय चुनें --</option>';
  subjects.forEach(sub => {
    selectEl.innerHTML += `<option value="${sub}">${sub}</option>`;
  });
}

// ===== UPDATE MCQ SUBJECTS =====
function updateMcqSubjects() {
  const cls = parseInt(document.getElementById('mcq-class').value);
  const medium = document.getElementById('mcq-medium').value;
  const streamGroup = document.getElementById('mcq-stream-group');
  const subjectSelect = document.getElementById('mcq-subject');

  if (cls === 11 || cls === 12) {
    streamGroup.style.display = 'block';
    const stream = document.getElementById('mcq-stream').value;
    if (stream && streamSubjects[stream]) {
      populateSubjects(subjectSelect, streamSubjects[stream][medium] || []);
    } else {
      subjectSelect.innerHTML = '<option value="">-- पहले Stream चुनें --</option>';
    }
  } else {
    streamGroup.style.display = 'none';
    if (allSubjects[cls]) {
      populateSubjects(subjectSelect, allSubjects[cls][medium] || []);
    } else {
      subjectSelect.innerHTML = '<option value="">-- पहले Class चुनें --</option>';
    }
  }
}

// ===== UPDATE FORM FIELDS =====
function updateFormFields() {
  const type = document.getElementById('f-type').value;
  document.getElementById('field-content').style.display = (type === 'notes' || type === 'imp') ? 'block' : 'none';
  document.getElementById('field-video').style.display = (type === 'video') ? 'block' : 'none';
  document.getElementById('field-pdf').style.display = (type === 'pdf' || type === 'pyq') ? 'block' : 'none';
}

// ===== ADD CONTENT =====
async function addContent() {
  const medium = document.getElementById('f-medium').value;
  const cls = document.getElementById('f-class').value;
  const subject = document.getElementById('f-subject').value;
  const type = document.getElementById('f-type').value;
  const chapter = document.getElementById('f-chapter').value;
  const chapterName = document.getElementById('f-chapter-name').value;
  const title = document.getElementById('f-title').value;
  const content = document.getElementById('f-content').value;
  const videoUrl = document.getElementById('f-video').value;
  const pdfUrl = document.getElementById('f-pdf').value;
  const msgEl = document.getElementById('add-msg');

  if (!cls || !subject || !chapter || !chapterName || !title) {
    showMsg(msgEl, '❌ सभी * fields भरो!', 'error');
    return;
  }

  const body = { medium, class: parseInt(cls), subject, contentType: type, chapter: parseInt(chapter), chapterName, title, content, videoUrl, pdfUrl };

  try {
    const res = await fetch(`${API}/content`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (data.success) {
      showMsg(msgEl, '✅ Content successfully save हो गया!', 'success');
      clearForm();
    } else {
      showMsg(msgEl, '❌ Error: ' + data.error, 'error');
    }
  } catch (err) {
    showMsg(msgEl, '❌ Server से connection नहीं हो पाया!', 'error');
  }
}

// ===== ADD MCQ =====
async function addMCQ() {
  const medium = document.getElementById('mcq-medium').value;
  const cls = document.getElementById('mcq-class').value;
  const subject = document.getElementById('mcq-subject').value;
  const chapter = document.getElementById('mcq-chapter').value;
  const chapterName = document.getElementById('mcq-chapter-name').value;
  const question = document.getElementById('mcq-question').value;
  const optA = document.getElementById('mcq-opt-a').value;
  const optB = document.getElementById('mcq-opt-b').value;
  const optC = document.getElementById('mcq-opt-c').value;
  const optD = document.getElementById('mcq-opt-d').value;
  const correct = parseInt(document.getElementById('mcq-correct').value);
  const msgEl = document.getElementById('mcq-msg');

  if (!cls || !subject || !chapter || !chapterName || !question || !optA || !optB || !optC || !optD) {
    showMsg(msgEl, '❌ सभी fields भरो!', 'error');
    return;
  }

  const body = {
    medium, class: parseInt(cls), subject, contentType: 'mcq',
    chapter: parseInt(chapter), chapterName,
    title: question,
    mcqOptions: [
      { option: optA, isCorrect: correct === 0 },
      { option: optB, isCorrect: correct === 1 },
      { option: optC, isCorrect: correct === 2 },
      { option: optD, isCorrect: correct === 3 },
    ]
  };

  try {
    const res = await fetch(`${API}/content`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (data.success) {
      showMsg(msgEl, '✅ MCQ successfully save हो गया!', 'success');
      clearMCQForm();
    } else {
      showMsg(msgEl, '❌ Error: ' + data.error, 'error');
    }
  } catch (err) {
    showMsg(msgEl, '❌ Server से connection नहीं हो पाया!', 'error');
  }
}

// ===== LOAD CONTENT LIST =====
async function loadContentList() {
  const cls = document.getElementById('filter-class').value;
  const type = document.getElementById('filter-type').value;
  const listEl = document.getElementById('content-list');
  listEl.innerHTML = '<p style="text-align:center;color:#999;padding:20px">Loading...</p>';

  let url = `${API}/content?`;
  if (cls) url += `class=${cls}&`;
  if (type) url += `contentType=${type}&`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.data || data.data.length === 0) {
      listEl.innerHTML = '<p style="text-align:center;color:#999;padding:30px">📭 कोई content नहीं मिला</p>';
      return;
    }

    let html = `<table class="content-table">
      <thead>
        <tr>
          <th>Class</th>
          <th>Subject</th>
          <th>Chapter</th>
          <th>Title</th>
          <th>Type</th>
          <th>Medium</th>
          <th>Action</th>
        </tr>
      </thead><tbody>`;

    data.data.forEach(item => {
      const color = typeColors[item.contentType] || '#999';
      html += `<tr>
        <td><b>${item.class}</b></td>
        <td>${item.subject}</td>
        <td>${item.chapter}. ${item.chapterName}</td>
        <td>${item.title}</td>
        <td><span class="type-badge" style="background:${color}20;color:${color}">${item.contentType.toUpperCase()}</span></td>
        <td>${item.medium === 'hindi' ? '🇮🇳 Hindi' : '🔤 English'}</td>
        <td><button class="btn-danger" onclick="deleteContent('${item._id}')">🗑️ Delete</button></td>
      </tr>`;
    });

    html += '</tbody></table>';
    html += `<p style="color:#999;font-size:13px;margin-top:12px">कुल: <b>${data.data.length}</b> items</p>`;
    listEl.innerHTML = html;
  } catch (err) {
    listEl.innerHTML = '<p style="text-align:center;color:red;padding:20px">❌ Server error!</p>';
  }
}

// ===== DELETE CONTENT =====
async function deleteContent(id) {
  if (!confirm('क्या सच में delete करना है?')) return;
  try {
    const res = await fetch(`${API}/content/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) loadContentList();
  } catch (err) {
    alert('Delete नहीं हो पाया!');
  }
}

// ===== HELPER FUNCTIONS =====
function showMsg(el, msg, type) {
  el.textContent = msg;
  el.className = `msg ${type}`;
  el.style.display = 'block';
  setTimeout(() => el.style.display = 'none', 4000);
}

function clearForm() {
  ['f-class','f-subject','f-chapter','f-chapter-name','f-title','f-content','f-video','f-pdf'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

function clearMCQForm() {
  ['mcq-class','mcq-subject','mcq-chapter','mcq-chapter-name','mcq-question','mcq-opt-a','mcq-opt-b','mcq-opt-c','mcq-opt-d'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

// Init
updateFormFields();