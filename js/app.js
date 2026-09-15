// Lógica e interações do teste vocacional.

let current = 0;
let selected = null;
let scores = [];

const $ = id => document.getElementById(id);

/* =========================// Lógica e interações do teste vocacional.

let current = 0;
let selected = null;
let scores = [];

const $ = id => document.getElementById(id);

/* =========================
   CURSOS
========================= */

function renderCourses() {
    const sortedCourses = [...courses].sort((a, b) =>
        a.name.localeCompare(b.name, 'pt-BR', {
            sensitivity: 'base'
        })
    );

    const courseGrid = $('courseGrid');

    if (!courseGrid) {
        return;
    }

    courseGrid.innerHTML = sortedCourses.map((course, index) => {
        const originalIndex = courses.indexOf(course);

        return `
            <article class="course" onclick="openCourse(${originalIndex})">
                <small>CAMINHO ${String(index + 1).padStart(2, '0')}</small>

                <h3>${course.name}</h3>

                <p>${course.desc}</p>

                <span class="course-link">
                    Conhecer o curso →
                </span>
            </article>
        `;
    }).join('');
}

/* =========================
   MODAL DOS CURSOS
========================= */

function openCourse(i) {
    const c = courses[i];

    if (!c) {
        return;
    }

    $('modalTitle').textContent = c.name;
    $('modalDesc').textContent = c.desc;
    $('modalPpc').href = c.ppc;

    $('courseModal').classList.add('open');

    document.body.style.overflow = 'hidden';
}

function closeModal() {
    $('courseModal').classList.remove('open');

    document.body.style.overflow = '';
}

/* =========================
   NAVEGAÇÃO
========================= */

function show(section) {
    $('home').style.display = section === 'home' ? 'block' : 'none';
    $('quiz').style.display = section === 'quiz' ? 'block' : 'none';
    $('result').style.display = section === 'result' ? 'block' : 'none';
}

function goHome() {
    closeModal();

    show('home');

    history.replaceState(null, '', '#');

}

/* =========================
   INICIAR TESTE
========================= */

function startQuiz() {
    closeModal();

    current = 0;
    selected = null;

    // Mantém os 7 índices originais dos cursos.
    // Não alterar a ordem do array courses em data.js.
    scores = Array(7).fill(0);

    show('quiz');

    history.replaceState(null, '', '#quiz');

    renderQuestion();

}

/* =========================
   QUESTÕES
========================= */

function renderQuestion() {
    const q = questions[current];

    if (!q) {
        return;
    }

    $('counter').textContent =
        String(current + 1).padStart(2, '0') +
        ' / ' +
        questions.length;

    $('qcat').textContent = q.cat;

    $('question').textContent = q.q;

    $('qnote').textContent = q.note;

    $('progress').style.width =
        ((current + 1) / questions.length * 100) + '%';

    const box = $('answers');

    box.innerHTML = '';

    selected = null;

    q.a.forEach((a, i) => {
        const b = document.createElement('button');

        b.className = 'answer';

        b.type = 'button';

        b.innerHTML = `
            <span class="letter">
                ${String.fromCharCode(65 + i)}
            </span>

            <span>
                ${a[0]}
            </span>
        `;

        b.onclick = () => selectAnswer(i, b);

        box.appendChild(b);
    });

    $('prev').disabled = current === 0;

    $('next').disabled = true;

    $('next').textContent =
        current === questions.length - 1
            ? 'Ver meu resultado →'
            : 'Continuar →';
}

function selectAnswer(i, b) {
    document
        .querySelectorAll('.answer')
        .forEach(x => x.classList.remove('selected'));

    b.classList.add('selected');

    selected = i;

    $('next').disabled = false;
}

/* =========================
   PONTUAÇÃO
========================= */

function addScore(weights) {
    Object.entries(weights).forEach(([i, v]) => {
        scores[Number(i)] += v;
    });
}

/* =========================
   AVANÇAR QUESTÃO
========================= */

function nextQuestion() {
    if (selected === null) {
        return;
    }

    addScore(
        questions[current].a[selected][1]
    );

    if (current < questions.length - 1) {
        current++;

        renderQuestion();

    } else {
        showResult();
    }
}

/* =========================
   VOLTAR QUESTÃO
========================= */

function prevQuestion() {
    if (current === 0) {
        return;
    }

    current--;

    renderQuestion();

}

/* =========================
   RESULTADO
========================= */

function showResult() {
    show('result');

    const ranked = scores
        .map((score, i) => ({
            score,
            i
        }))
        .sort((a, b) => b.score - a.score);

    const top = ranked[0];

    const maxScore = Math.max(...scores);

    const topPercentage =
        maxScore > 0
            ? Math.round(top.score / maxScore * 100)
            : 0;

    $('resultTitle').textContent =
        courses[top.i].name;

    $('resultText').textContent =
        'Suas respostas indicam maior afinidade com uma trajetória que combina com a forma como você escolhe, analisa e transforma problemas. Isso não é uma sentença sobre seu futuro: é um ponto de partida para comparar cursos.';

    $('whyText').textContent =
        courses[top.i].why;

    $('matches').innerHTML =
        ranked
            .slice(0, 3)
            .map((r, n) => {
                const percentage =
                    maxScore > 0
                        ? Math.round(r.score / maxScore * 100)
                        : 0;

                return `
                    <article class="match ${n === 0 ? 'rank1' : ''}">

                        <small>
                            ${
                                n === 0
                                    ? 'MAIOR AFINIDADE'
                                    : n === 1
                                        ? 'SEGUNDA AFINIDADE'
                                        : 'TERCEIRA AFINIDADE'
                            }
                        </small>

                        <h3>
                            ${courses[r.i].name}
                        </h3>

                        <span class="pct">
                            ${percentage}% de compatibilidade relativa
                        </span>

                        <div class="bar">
                            <i style="width:${Math.max(10, percentage)}%"></i>
                        </div>

                        <button
                            type="button"
                            class="course-link"
                            style="background:none;border:0;padding:0;cursor:pointer"
                            onclick="openCourse(${r.i})"
                        >
                            Conhecer este curso →
                        </button>

                    </article>
                `;
            })
            .join('');

    history.replaceState(
        null,
        '',
        '#resultado'
    );

}

/* =========================
   TECLADO
========================= */

document.addEventListener('keydown', e => {

    if ($('quiz').style.display !== 'block') {
        return;
    }

    if (['1', '2', '3', '4'].includes(e.key)) {

        const i = Number(e.key) - 1;

        const b =
            document.querySelectorAll('.answer')[i];

        if (b) {
            selectAnswer(i, b);
        }
    }

    if (
        e.key === 'Enter' &&
        !$('next').disabled
    ) {
        nextQuestion();
    }

    if (e.key === 'ArrowLeft') {
        prevQuestion();
    }

    if (e.key === 'Escape') {
        goHome();
    }
});

/* =========================
   INICIALIZAÇÃO
========================= */

document.addEventListener('DOMContentLoaded', () => {
    renderCourses();
});

   CURSOS
========================= */

function renderCourses() {
    const sortedCourses = [...courses].sort((a, b) =>
        a.name.localeCompare(b.name, 'pt-BR', {
            sensitivity: 'base'
        })
    );

    const courseGrid = $('courseGrid');

    if (!courseGrid) {
        return;
    }

    courseGrid.innerHTML = sortedCourses.map((course, index) => {
        const originalIndex = courses.indexOf(course);

        return `
            <article class="course" onclick="openCourse(${originalIndex})">
                <small>CAMINHO ${String(index + 1).padStart(2, '0')}</small>

                <h3>${course.name}</h3>

                <p>${course.desc}</p>

                <span class="course-link">
                    Conhecer o curso →
                </span>
            </article>
        `;
    }).join('');
}

/* =========================
   MODAL DOS CURSOS
========================= */

function openCourse(i) {
    const c = courses[i];

    if (!c) {
        return;
    }

    $('modalTitle').textContent = c.name;
    $('modalDesc').textContent = c.desc;
    $('modalPpc').href = c.ppc;

    $('courseModal').classList.add('open');

    document.body.style.overflow = 'hidden';
}

function closeModal() {
    $('courseModal').classList.remove('open');

    document.body.style.overflow = '';
}

/* =========================
   NAVEGAÇÃO
========================= */

function show(section) {
    $('home').style.display = section === 'home' ? 'block' : 'none';
    $('quiz').style.display = section === 'quiz' ? 'block' : 'none';
    $('result').style.display = section === 'result' ? 'block' : 'none';
}

function goHome() {
    closeModal();

    show('home');

    history.replaceState(null, '', '#');

    window.scrollTo({
        top: 0,
        behavior: 'auto'
    });
}

/* =========================
   INICIAR TESTE
========================= */

function startQuiz() {
    closeModal();

    current = 0;
    selected = null;

    // Mantém os 7 índices originais dos cursos.
    // Não alterar a ordem do array courses em data.js.
    scores = Array(7).fill(0);

    show('quiz');

    history.replaceState(null, '', '#quiz');

    renderQuestion();

    window.scrollTo({
        top: 0,
        behavior: 'auto'
    });
}

/* =========================
   QUESTÕES
========================= */

function renderQuestion() {
    const q = questions[current];

    if (!q) {
        return;
    }

    $('counter').textContent =
        String(current + 1).padStart(2, '0') +
        ' / ' +
        questions.length;

    $('qcat').textContent = q.cat;

    $('question').textContent = q.q;

    $('qnote').textContent = q.note;

    $('progress').style.width =
        ((current + 1) / questions.length * 100) + '%';

    const box = $('answers');

    box.innerHTML = '';

    selected = null;

    q.a.forEach((a, i) => {
        const b = document.createElement('button');

        b.className = 'answer';

        b.type = 'button';

        b.innerHTML = `
            <span class="letter">
                ${String.fromCharCode(65 + i)}
            </span>

            <span>
                ${a[0]}
            </span>
        `;

        b.onclick = () => selectAnswer(i, b);

        box.appendChild(b);
    });

    $('prev').disabled = current === 0;

    $('next').disabled = true;

    $('next').textContent =
        current === questions.length - 1
            ? 'Ver meu resultado →'
            : 'Continuar →';
}

function selectAnswer(i, b) {
    document
        .querySelectorAll('.answer')
        .forEach(x => x.classList.remove('selected'));

    b.classList.add('selected');

    selected = i;

    $('next').disabled = false;
}

/* =========================
   PONTUAÇÃO
========================= */

function addScore(weights) {
    Object.entries(weights).forEach(([i, v]) => {
        scores[Number(i)] += v;
    });
}

/* =========================
   AVANÇAR QUESTÃO
========================= */

function nextQuestion() {
    if (selected === null) {
        return;
    }

    addScore(
        questions[current].a[selected][1]
    );

    if (current < questions.length - 1) {
        current++;

        renderQuestion();
    } else {
        showResult();
    }
}

/* =========================
   VOLTAR QUESTÃO
========================= */

function prevQuestion() {
    if (current === 0) {
        return;
    }

    current--;

    renderQuestion();
}

/* =========================
   RESULTADO
========================= */

function showResult() {
    show('result');

    const ranked = scores
        .map((score, i) => ({
            score,
            i
        }))
        .sort((a, b) => b.score - a.score);

    const top = ranked[0];

    const maxScore = Math.max(...scores);

    const topPercentage =
        maxScore > 0
            ? Math.round(top.score / maxScore * 100)
            : 0;

    $('resultTitle').textContent =
        courses[top.i].name;

    $('resultText').textContent =
        'Suas respostas indicam maior afinidade com uma trajetória que combina com a forma como você escolhe, analisa e transforma problemas. Isso não é uma sentença sobre seu futuro: é um ponto de partida para comparar cursos.';

    $('whyText').textContent =
        courses[top.i].why;

    $('matches').innerHTML =
        ranked
            .slice(0, 3)
            .map((r, n) => {
                const percentage =
                    maxScore > 0
                        ? Math.round(r.score / maxScore * 100)
                        : 0;

                return `
                    <article class="match ${n === 0 ? 'rank1' : ''}">

                        <small>
                            ${
                                n === 0
                                    ? 'MAIOR AFINIDADE'
                                    : n === 1
                                        ? 'SEGUNDA AFINIDADE'
                                        : 'TERCEIRA AFINIDADE'
                            }
                        </small>

                        <h3>
                            ${courses[r.i].name}
                        </h3>

                        <span class="pct">
                            ${percentage}% de compatibilidade relativa
                        </span>

                        <div class="bar">
                            <i style="width:${Math.max(10, percentage)}%"></i>
                        </div>

                        <button
                            type="button"
                            class="course-link"
                            style="background:none;border:0;padding:0;cursor:pointer"
                            onclick="openCourse(${r.i})"
                        >
                            Conhecer este curso →
                        </button>

                    </article>
                `;
            })
            .join('');

    history.replaceState(
        null,
        '',
        '#resultado'
    );

    window.scrollTo({
        top: 0,
        behavior: 'auto'
    });
}

/* =========================
   TECLADO
========================= */

document.addEventListener('keydown', e => {

    if ($('quiz').style.display !== 'block') {
        return;
    }

    if (['1', '2', '3', '4'].includes(e.key)) {

        const i = Number(e.key) - 1;

        const b =
            document.querySelectorAll('.answer')[i];

        if (b) {
            selectAnswer(i, b);
        }
    }

    if (
        e.key === 'Enter' &&
        !$('next').disabled
    ) {
        nextQuestion();
    }

    if (e.key === 'ArrowLeft') {
        prevQuestion();
    }

    if (e.key === 'Escape') {
        goHome();
    }
});

/* =========================
   INICIALIZAÇÃO
========================= */

document.addEventListener('DOMContentLoaded', () => {
    renderCourses();
});
