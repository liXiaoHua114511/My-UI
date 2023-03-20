<template>
	<div>
		<div>
			<Selector :data="options" @setTargetIndex="setTargetIndex"></Selector>
		</div>
		<div class="transfer">
			<div
				class="box left-list"
				@dragover.prevent
				@drop="removeRightListData([dragedItem])"
			>
				<h1 class="list-title">{{ leftTitle }}</h1>
				<ListItem
					:data="leftListData"
					@setCheckedData="setCheckedData"
					:leftOrRight="'left'"
					@dragItem="setDragedItem"
				></ListItem>
			</div>
			<ButtonGroup
				:transferButtonDisabled="transferButtonDisabled"
				:checkedData="checkedData"
				@removeRightListData="removeRightListData"
				@addRightListData="addRightListData"
			></ButtonGroup>
			<div
				class="box right-list"
				@dragover.prevent
				@drop="addRightListData([dragedItem])"
			>
				<h1 class="list-title">{{ rightTitle }}</h1>
				<ListItem
					:data="rightListData"
					:leftOrRight="'right'"
					@setCheckedData="setCheckedData"
					@dragItem="setDragedItem"
				></ListItem>
			</div>
		</div>
	</div>
</template>

<script setup>
import Selector from "./components/Selector.vue";
import ButtonGroup from "./components/ButtonGroup.vue";
import ListItem from "./components/ListItem.vue";
import {
	useTarggetIndex,
	useComputedData,
	useRightListData,
	useCheckedData,
	useDragedItem,
} from "./hooks.js";

const props = defineProps({
	data: {
		type: Array,
		default: () => [],
	},
	rightTitle: {
		type: String,
		default: "已选择",
	},
});
const { data, rightTitle } = props;
const options = data.map((item) => item.title);
const [checkedData, addCheckedData, removeCheckedData] = useCheckedData();

const { rightListData, addRightListData, removeRightListData } =
	useRightListData([], checkedData);

const [targetIndex, setTargetIndex] = useTarggetIndex(0);

const { leftTitle, leftListData, transferButtonDisabled } = useComputedData(
	props.data,
	targetIndex,
	rightListData,
	checkedData
);

const [dragedItem, setDragedItem] = useDragedItem();

//将左边的数据添加到右边
const setCheckedData = (checked, leftOrRight, item) => {
	checked
		? addCheckedData(leftOrRight, item)
		: removeCheckedData(leftOrRight, item.id);
};
</script>

<style lang="less" scoped>
.transfer {
	display: flex;
	flex-direction: row;
	width: 460px;
	height: 400px;
	border: 1px solid #ddd;
	justify-content: space-between;

	.box {
		width: 170px;
		height: 100%;
		// display: flex;
		// justify-content: space-between;

		.list-title {
			height: 38px;
			display: flex;
			justify-content: center;
			align-items: center;
			font-weight: normal;
			margin: 0;
			color: #666;
			border-bottom: 1px solid #ddd;
			background-color: #efefef;
			font-size: 14px;
		}
		// .list-item {
		// 	display: flex;
		// 	align-items: center;
		// 	height: 30px;
		// 	font-size: 12px;
		// 	color: #666;
		// }
		// &.button-group {
		// 	// margin: 0 auto;
		// 	display: flex;
		// 	justify-content: center;
		// 	align-items: center;
		// 	border-left: 1px solid #ddd;
		// 	border-right: 1px solid #ddd;

		// 	button {
		// 		border: none;
		// 		outline: none;
		// 		width: 38px;
		// 		height: 38px;
		// 		background-color: orange;
		// 		border-radius: 5px;
		// 		&:disabled {
		// 			opacity: 0.6;
		// 		}
		// 		&:nth-child(2) {
		// 			margin-left: 10px;
		// 		}
		// 	}
		// }
	}
}
</style>
