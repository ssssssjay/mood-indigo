const inpComment = document.querySelector('#inpComment');
const btnSubmit = document.querySelector('#btnSubmit');
const btnClear = document.querySelector('#btnClear');
const inpColor = document.querySelector('#inpColor');
const list = document.querySelector('#list');
const label = document.querySelector('label')

let moodList = [];

function clearAll() {
  localStorage.removeItem('moods');
  window.location.reload();
}

btnClear.addEventListener('click', clearAll);

function saveMood() {
  localStorage.setItem('moods', JSON.stringify(moodList))
}

function deleteMood(e) {
  const li = e.target.parentElement;
  li.remove();
  moodList = moodList.filter((mood) => mood.id !== li.id);
  saveMood();
}

function paintMood(mood) {
  const li = document.createElement("li");
  li.id = mood.id;
  const div = document.createElement('div');
  div.classList.add('color');
  div.style.backgroundColor = mood.color;
  const h2 = document.createElement('h2');
  h2.innerText = `it's ${mood.color}`;
  const p = document.createElement('p')
  p.innerText = mood.content
  const button = document.createElement('button');
  button.innerText = '🗑';
  button.addEventListener('click', deleteMood);
  const footer = document.createElement('footer');
  footer.innerText = mood.id
  li.appendChild(div)
  li.appendChild(h2);
  li.appendChild(p);
  footer.appendChild(button);
  li.appendChild(footer);
  list.appendChild(li);
}

function submitMood() {
  const newMood = inpComment.value;
  if (newMood) {
    inpComment.value = '';
    label.innerText = '# Pick me!';
    const date = new Date();
    const y = `${date.getFullYear()}`;
    const m = `${date.getMonth() + 1}`;
    const d = `${date.getDate()}`;
    const h = `${date.getHours()}`;
    const min = `${date.getMinutes()}`;
    const newMoodObj = {
      id: y + '.' + m.padStart(2,0) + '.' + d.padStart(2,0) + ' ' + h.padStart(2,0) + ':' + min.padStart(2,0),
      content: newMood,
      color: inpColor.value
    };
    moodList.push(newMoodObj);
    paintMood(newMoodObj);
    saveMood();
  }
}

function paintColor() {
  label.innerText = inpColor.value;
}

inpColor.addEventListener('input', paintColor);
btnSubmit.addEventListener('click', submitMood);

const savedMoods = localStorage.getItem('moods');

if (savedMoods !== null) {
  const parsedMoods = JSON.parse(savedMoods);
  moodList = parsedMoods;
  parsedMoods.forEach(paintMood);
}
// html2canvas(document.querySelector("#id")).then(canvas => {
//   document.body.appendChild(canvas)
// });