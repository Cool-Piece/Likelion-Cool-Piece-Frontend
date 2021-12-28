// add types to selectbox
export function addStudyType(studyType, selectionsType) {
  studyType.forEach((item) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    li.classList.add("stacks");
    button.textContent = item;
    button.classList.add("selections");
    selectionsType.appendChild(li).appendChild(button);
  });
}

export function addStackType(stackType, selectionsLanguage) {
  stackType.forEach((item) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    li.classList.add("languages");
    button.textContent = item;
    button.classList.add("selections");
    selectionsLanguage.appendChild(li).appendChild(button);
  });
}

// 셀렉트 박스 클릭 시 토글
export function toggleSelectBox(event, selections) {
  event.preventDefault();
  selections.classList.toggle("active");
}

// 스터디 유형 셀렉트 박스 선택 시 텍스트 변경
export function handleSelectType(type, selectbox) {
  type.addEventListener("click", (event) => {
    if (event.target.nodeName === "BUTTON") {
      selectbox.textContent = `${event.target.textContent}`;
      event.preventDefault();
    }
    type.classList.remove("active");
  });
}

// 스택 유형 셀렉트 박스 선택 시 태그 추가
// 스택 유형 태그 제거
export function handleTypeTag(selection, list, tag) {
  selection.addEventListener("click", (event) => {
    let flag = true;
    list.forEach((tag) => {
      if(event.target.textContent === tag) {
        flag = false;
      }
    });
    if (flag) {
      if (event.target.nodeName === "BUTTON") {
        const li = document.createElement("li");
        tag.appendChild(li);
        li.textContent = `${event.target.textContent}`;
        list.push(event.target.textContent);
      }
    }
    event.preventDefault();
    selection.classList.remove("active");
  });
  tag.addEventListener("click", (event) => {
    let removeTag;
    if (event.target.nodeName === "LI") {
      event.target.remove();
      removeTag = list.indexOf(event.target.textContent);
      list.splice(removeTag, 1);
    }
  });
}
