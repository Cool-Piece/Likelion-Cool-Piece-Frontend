import {
	LOCAL_CATEGORY,
	LOCAL_CATEGORY_LAST_UPDATE,
	LOCAL_CATEGORY_MAX_MS,
	LOCAL_CATEGORY_RECRUITED,
	LOCAL_CATEGORY_RECRUITING
} from "./constant.js";
import CategoryData from "./categoryData.js";

export default class Category {
	#categoryData = null;
	#selectedItems = [];
	#recruiting = false;
	#recruited = false;
	#onFilter = null;

  constructor({$target, onFilter}) {
    this.$target = $target;
		this.#onFilter = onFilter;
		this.#categoryData = new CategoryData();

		this.#initAddEvents();
		this.#initPrevSelectedItems();
		// TODO: 데이터 비동기 처리가 끝나면 render를 실행할 수 있도록 수정
		this.#render(this.#categoryData.getData());
  }

	#addSelected(categoryElement) {
		categoryElement.classList.add("select");
		this.#selectedItems.push(categoryElement.textContent);
	}

	#removeSelected(categoryElement) {
		categoryElement.classList.remove("select");
		this.#selectedItems = this.#selectedItems.filter(item => item !== categoryElement.textContent);
	}

	#initAddEvents() {
		this.$target.addEventListener("click", e => {
			const categoryItem = e.target.closest(".categoryItem");
			
			if (categoryItem?.contains(e.target)) {
				if (categoryItem.classList.contains("select")) {
					this.#removeSelected(categoryItem);
				} else {
					this.#addSelected(categoryItem);
				}
				localStorage.setItem(LOCAL_CATEGORY_LAST_UPDATE, new Date());
				localStorage.setItem(LOCAL_CATEGORY, JSON.stringify(this.#selectedItems));
				this.#onFilter(this.getSelectedCategory());
			}
		})
		
		const recruitingLabel = document.querySelector(`label[for="recruiting"]`);
		const recruitingBox = document.getElementById("recruiting");
		const recruitedLabel = document.querySelector(`label[for="recruited"]`);
		const recruitedBox = document.getElementById("recruited");
		
		const updateRecruit = (recruitType, recruit) => {
			localStorage.setItem(recruitType, recruit);
			localStorage.setItem(LOCAL_CATEGORY_LAST_UPDATE, new Date());
			this.#onFilter(this.getSelectedCategory());
		}

		recruitingLabel.addEventListener("click", () => {
			if (recruitingBox.checked) this.#recruiting = false;
			else this.#recruiting = true;
			updateRecruit(LOCAL_CATEGORY_RECRUITING, this.#recruiting);
		})
		recruitedLabel.addEventListener("click", () => {
			if (recruitedBox.checked) this.#recruited = false;
			else this.#recruited = true;
			updateRecruit(LOCAL_CATEGORY_RECRUITED, this.#recruited);
		})
	}

	#initPrevSelectedItems() {
		const lastUpdated = localStorage.getItem(LOCAL_CATEGORY_LAST_UPDATE);
		let prevData, currentData;

		if (lastUpdated) {
			prevData = Date.parse(lastUpdated);
			currentData = new Date();
		}

		if (!lastUpdated || (currentData - prevData) >= LOCAL_CATEGORY_MAX_MS) {
			localStorage.setItem(LOCAL_CATEGORY_LAST_UPDATE, new Date());
			localStorage.setItem(LOCAL_CATEGORY, JSON.stringify([]));
			localStorage.setItem(LOCAL_CATEGORY_RECRUITED, false);
			localStorage.setItem(LOCAL_CATEGORY_RECRUITING, false);
		} else {
			this.#selectedItems = JSON.parse(localStorage.getItem(LOCAL_CATEGORY));
			this.#recruited = localStorage.getItem(LOCAL_CATEGORY_RECRUITED) === "true" ? true : false;
			this.#recruiting = localStorage.getItem(LOCAL_CATEGORY_RECRUITING) === "true" ? true : false;
		}
	}

	getSelectedCategory() {
		return {
			selectedItems: this.#selectedItems,
			recruiting: this.#recruiting,
			recruited: this.#recruited
		}
	}

	#render(categorys) {
		if (this.#recruiting) document.getElementById("recruiting").checked = true;
		if (this.#recruited) document.getElementById("recruited").checked = true;

		this.$target.innerHTML = categorys.map(category => {
			if (!this.#selectedItems.includes(category)){
				return `<li class="categoryItem">${category}</li>`
			} else {
				return `<li class="categoryItem select">${category}</li>`
			}
		}).join('');
	}
}