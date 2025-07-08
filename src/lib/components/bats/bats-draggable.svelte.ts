type BatsDraggableOptionsT = {
	isDisabled: boolean
	snapX: number
	snapY: number
	bounds?: 'parent' | 'window' | RectObjectT
	onDragStart: (data: BatsDragEventT) => void
	onDrag: (data: BatsDragEventT) => void
	onDragEnd: (data: BatsDragEventT) => void
}

type RectObjectT = {
	top: number // top position of the element
	left: number // left position of the element
	bottom: number // bottom position of the element
	right: number // right position of the element
}

type PositionDataT = {
	startX: number // original position of the element on the x-axis
	startY: number // original position of the element on the y-axis
	currentX: number // current position of the element on the x-axis
	currentY: number // current position of the element on the y-axis
	offsetX: number // distance traveled from the original position on the x-axis
	offsetY: number // distance traveled from the original position on the y-axis
}

type BatsDragEventT = {
	event: PointerEvent
	target: HTMLElement
	currentTarget: HTMLElement
	positions: {
		pointer: PositionDataT
		element: PositionDataT
	}
}

const shared = $state({
	draggingElement: null as HTMLElement | null,
	isDragging: false,
	elements: {}
})

const snapTo = (value: number, size: number) => {
	if (!size) return value
	return Math.round(value / size) * size
}

export const draggable = (options: BatsDraggableOptionsT) => {
	const state = $state({
		isDragging: false,

		pointer: {
			startX: 0, // original pointer position
			startY: 0, // original pointer position
			currentX: 0, // most recent pointer position
			currentY: 0, // most recent pointer position
			offsetX: 0, // distance traveled (start - current)
			offsetY: 0 // distance traveled (start - current)
		},

		element: {
			startX: 0,
			startY: 0,
			currentX: 0,
			currentY: 0,
			offsetX: 0,
			offsetY: 0
		}
	})

	return (element: HTMLElement) => {
		// PLAN: onPointerDown, save the original position
		// of the element's DOMRect (top/left) and the original
		// position of the pointer (clientX/clientY).
		// onPointerMove, calculate and save the distance
		// traveled by the pointer from the original position
		// and also use said calculations to update the
		// element's currentX and currentY position in state.
		// onPointerUp, run the calculations one final time
		// and report the final positions to the callback.
		// The consuming scope of the attachment should take
		// the position values sent in the callback and apply
		// the necessary CSS positioning and such manually.

		const onPointerDown = (event: PointerEvent) => {
			if (options.isDisabled) return
			if (state.isDragging) return
			element.setPointerCapture(event.pointerId)

			const rect = element.getBoundingClientRect()
			state.isDragging = true
			state.pointer.startX = event.clientX
			state.pointer.startY = event.clientY
			state.pointer.currentX = event.clientX
			state.pointer.currentY = event.clientY
			state.pointer.offsetX = 0
			state.pointer.offsetY = 0

			state.element.startX = rect.left
			state.element.startY = rect.top
			state.element.currentX = rect.left
			state.element.currentY = rect.top
			state.element.offsetX = 0
			state.element.offsetY = 0

			options.onDragStart?.({
				event,
				target: element,
				currentTarget: event.target as HTMLElement,
				positions: { pointer: state.pointer, element: state.element }
			})

			window.addEventListener('pointermove', onPointerMove)
			window.addEventListener('pointerup', onPointerUp)
		}

		const onPointerMove = (event: PointerEvent) => {
			if (!state.isDragging) return
			if (options.isDisabled) return

			state.pointer.currentX = event.clientX
			state.pointer.currentY = event.clientY
			state.pointer.offsetX = state.pointer.currentX - state.pointer.startX
			state.pointer.offsetY = state.pointer.currentY - state.pointer.startY
			state.element.currentX = snapTo(state.element.startX + state.pointer.offsetX, options.snapX)
			state.element.currentY = snapTo(state.element.startY + state.pointer.offsetY, options.snapY)
			state.element.offsetX = state.element.currentX - state.element.startX
			state.element.offsetY = state.element.currentY - state.element.startY

			options.onDrag?.({
				event,
				target: element,
				currentTarget: event.target as HTMLElement,
				positions: { pointer: state.pointer, element: state.element }
			})
		}

		const onPointerUp = (event: PointerEvent) => {
			if (!state.isDragging) return
			state.isDragging = false

			window.removeEventListener('pointermove', onPointerMove)
			window.removeEventListener('pointerup', onPointerUp)
			element.releasePointerCapture(event.pointerId)

			state.pointer.currentX = event.clientX
			state.pointer.currentY = event.clientY
			state.pointer.offsetX = state.pointer.currentX - state.pointer.startX
			state.pointer.offsetY = state.pointer.currentY - state.pointer.startY
			state.element.currentX = snapTo(state.element.startX + state.pointer.offsetX, options.snapX)
			state.element.currentY = snapTo(state.element.startY + state.pointer.offsetY, options.snapY)
			state.element.offsetX = state.element.currentX - state.element.startX
			state.element.offsetY = state.element.currentY - state.element.startY

			options.onDragEnd?.({
				event,
				target: element,
				currentTarget: event.target as HTMLElement,
				positions: { pointer: state.pointer, element: state.element }
			})
		}

		element.addEventListener('pointerdown', onPointerDown)

		return () => {
			element.removeEventListener('pointerdown', onPointerDown)
			window.removeEventListener('pointermove', onPointerMove)
			window.removeEventListener('pointerup', onPointerUp)
		}
	}
}
