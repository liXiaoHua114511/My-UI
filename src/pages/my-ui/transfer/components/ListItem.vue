<template>
	<div>
		<div
			v-for="item of data"
			:key="item.id"
			:class="['list-item', item.disabled ? 'disabled' : '']"
			:draggable="!item.disabled"
			@dragstart="dragItem(item)"
		>
			<input
				type="checkbox"
				:disabled="item.disabled"
				:id="'__checkbox__' + item.id"
				@click="setChecked($event.target.checked, leftOrRight, item)"
			/>
			<label :for="'__checkbox__' + item.id">
				{{ item.phone_name }}
			</label>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	data: {
		type: Array,
		default: () => [],
	},
	leftOrRight: {
		type: String,
		validator(value) {
			return ["left", "right".includes(value)];
		},
	},
});
const emit = defineEmits(["setCheckedData", "dragItem"]);

const setChecked = (checked, leftOrRight, item) => {
	console.log(checked, leftOrRight, item);
	emit("setCheckedData", checked, leftOrRight, item);
};

const dragItem=(item)=>{
	emit('dragItem',item)
}
</script>

<style lang="less" scoped>
.list-item {
	display: flex;
	align-items: center;
	height: 30px;
	font-size: 12px;
	color: #666;
}
</style>
