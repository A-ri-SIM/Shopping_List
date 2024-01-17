const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');
const clearBtn = document.querySelector('.clear_btn');
const form = document.querySelector('.new-form');
const ICON_CHECKED = 'change';
const ICON_UNCHECKED = 'pre';
const CICLE_CHECKED = 'cicle_change';
const CICLE_UNCHECKED = 'cicle_pre';
const STATUS_CHECKED = 'checked';
const STATUS_UNCHECKED = 'unchecked';

function onAdd() {
  // 1. 사용자가 입력한 텍스트를 받아옴
  const text = input.value;
  if (text === '') {
    input.focus();
    return;
  }

  // 2. 새로운 아이템을 만듬 (텍스트 + 삭제 버튼)
  const item = createItem(text);

  // 3. items 컨테이너안에 새로 만든 아이템을 추가한다
  items.appendChild(item);

  // 4. 새로 추가된 아이템으로 스크롤링
  item.scrollIntoView({ block: 'center' });

  // 5. 인풋을 초기화 한다
  input.value = '';
  input.focus();
}

let id = 0; // UUID
function createItem(text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item__row');
  itemRow.setAttribute('data-id', id);
  itemRow.innerHTML = `
    <div class="item" data-id=${id}>
      <div class="text_box">
        <div class="cicle cicle_pre" data-id=${id}></div>
        <span class="item__name pre" data-id=${id}>${text}</span>
      </div>
      <div class="button_box">
        <button class="item__check" >
          <i class="fa-solid fa-check pre" data-id=${id} data-name="checked" data-status="unchecked"></i>
        </button>
        <button class="item__delete" >
          <i class="fa-regular fa-trash-can" data-id=${id} data-name="deleted"></i>
        </button>
      </div>
    </div>
    <div class="divider"></div>
    `;
  id++;
  return itemRow;
}

function deleteItem(id) {
  const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
  toBeDeleted.remove();
}

function checkItem(id, status) {
  const checkName = document.querySelector(`.item__name[data-id="${id}"]`);
  const checkIcon = document.querySelector(`.fa-check[data-id="${id}"]`);
  const cicle = document.querySelector(`.cicle[data-id="${id}"]`);

  const prev = status === STATUS_UNCHECKED ? ICON_UNCHECKED : ICON_CHECKED;
  const changed = status === STATUS_UNCHECKED ? ICON_CHECKED : ICON_UNCHECKED;
  const cicle_prev =
    status === STATUS_UNCHECKED ? CICLE_UNCHECKED : CICLE_CHECKED;
  const cicle_changed =
    status === STATUS_UNCHECKED ? CICLE_CHECKED : CICLE_UNCHECKED;

  checkName.classList.replace(prev, changed);
  checkIcon.classList.replace(prev, changed);
  cicle.classList.replace(cicle_prev, cicle_changed);

  return status === STATUS_UNCHECKED ? STATUS_CHECKED : STATUS_UNCHECKED;
}

items.addEventListener('click', (event) => {
  const data = event.target.dataset;
  const id = data.id;
  console.log('hi');

  if (id) {
    const name = data.name;
    if (name === 'deleted') {
      deleteItem(id);
    } else if (name === 'checked') {
      data.status = checkItem(id, data.status);
    }
  }
});

clearBtn.addEventListener('click', () => {
  items.innerHTML = '';
});

form.addEventListener('sumit', (event) => {
  event.preventDefault();
  onAdd();
});
