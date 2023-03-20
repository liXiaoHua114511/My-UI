import { ref, computed, reactive } from "vue";

export function useTarggetIndex(initialIndex) {
	const targetIndex = ref(initialIndex);

	function setTragetIndex(newIndex) {
		targetIndex.value = Number(newIndex);
		console.log(targetIndex.value);
	}

	return [targetIndex, setTragetIndex];
}

export function useCheckedData() {
	const checkedData = reactive({
		left: [],
		right: [],
	});

	function addCheckedData(leftOrRight, item) {
		switch (leftOrRight) {
			case "left":
				checkedData.left.push(item);
				// console.log(checkedData.left);
				break;
			case "right":
				checkedData.right.push(item);
				// console.log(checkedData.right);
				break;
			default:
				break;
		}
	}

	function removeCheckedData(leftOrRight, id) {
		switch (leftOrRight) {
			case "left":
				checkedData.left = checkedData.left.filter((item) => item.id !== id);
				// console.log(checkedData.left);
				break;
			case "right":
				checkedData.right = checkedData.right.filter((item) => item.id !== id);
			// console.log(checkedData.right);
			default:
				break;
		}
	}
	return [checkedData, addCheckedData, removeCheckedData];
}

export function useRightListData(initiaData, checkedData) {
	const rightListData = ref(initiaData);

	function addRightListData(newData) {
		rightListData.value = [...rightListData.value, ...newData];
		checkedData.left = [];
	}
	function removeRightListData(newData) {
		newData.forEach((item) => {
			rightListData.value = rightListData.value.filter(
				(citem) => citem.title !== item.title
			);
		});
		checkedData.right = [];
	}
	return { rightListData, addRightListData, removeRightListData };
}

export function useDragedItem() {
	//保存拖拽对象的信息
	const dragedItem = ref(null);
	// console.log(item, 111);

	function setDragedItem(item) {
		console.log(item);
		//更新拖拽对象的信息
		dragedItem.value = item;
	}
	return [dragedItem, setDragedItem];
}

export function useComputedData(data, targetIndex, rightListData, checkedData) {
	const leftTitle = computed(() => data[targetIndex.value].title);

	const leftListData = computed(() => {
		const { data: currentData } = data[targetIndex.value];

		return currentData.filter((item) => {
			if (!rightListData.value.find(({ id }) => item.id === id)) {
				return item;
			}
		});
	});

	const transferButtonDisabled = computed(() => ({
		left: checkedData.left.length == 0,
		right: checkedData.right.length == 0,
	}));
	return {
		leftTitle,
		leftListData,
		transferButtonDisabled,
	};
}
