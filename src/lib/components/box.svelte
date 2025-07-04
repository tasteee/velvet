<script lang="ts">
	// filepath: src/lib/components/box.svelte
	import type { HTMLAttributes } from 'svelte/elements'
	import type { Snippet } from 'svelte'

	interface BoxProps extends HTMLAttributes<HTMLElement> {
		as?: keyof HTMLElementTagNameMap
		children?: Snippet
		isColumn?: boolean
		layoutX?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
		layoutY?: 'start' | 'end' | 'center' | 'stretch' | 'baseline'
		radius?: string
		border?: string
		outline?: string
		gap?: string | number
		gapX?: string | number
		gapY?: string | number
		padding?: string | number
		paddingTop?: string | number
		paddingLeft?: string | number
		paddingRight?: string | number
		paddingBottom?: string | number
		paddingX?: string | number
		paddingY?: string | number
		margin?: string | number
		marginTop?: string | number
		marginLeft?: string | number
		marginBottom?: string | number
		marginRight?: string | number
		marginX?: string | number
		marginY?: string | number
		height?: string | number
		minHeight?: string | number
		maxHeight?: string | number
		width?: string | number
		minWidth?: string | number
		maxWidth?: string | number
		strictWidth?: string | number
		strictHeight?: string | number
		wrap?: boolean | 'wrap' | 'nowrap' | 'wrap-reverse'
		borderColor?: string
		borderWidth?: string | number
		borderStyle?: string
		outline?: string
		outlineWidth?: string | number
		outlineColor?: string
		boxShadow?: string
		isInline?: boolean
		isReverse?: boolean
		background?: string
		color?: string
		scale?: string | number
		pointerEvents?: string
		userSelect?: string
		fullWidth?: boolean
		monoFont?: boolean
		boxShadow?: string
		overflow?: string
		hoverBoxShadow?: string
	}

	const STYLE_PROPS = [
		'hoverBoxShadow',
		'radius',
		'background',
		'color',
		'scale',
		'pointerEvents',
		'userSelect',
		'isColumn',
		'isRow',
		'isInline',
		'isReverse',
		'layoutX',
		'layoutY',
		'wrap',
		'gap',
		'gapX',
		'gapY',
		'padding',
		'paddingTop',
		'paddingLeft',
		'paddingRight',
		'paddingBottom',
		'paddingX',
		'paddingY',
		'margin',
		'marginTop',
		'marginLeft',
		'marginBottom',
		'marginRight',
		'marginX',
		'marginY',
		'height',
		'minHeight',
		'maxHeight',
		'monoFont',
		'width',
		'minWidth',
		'maxWidth',
		'strictWidth',
		'strictHeight',
		'borderColor',
		'borderWidth',
		'borderStyle',
		'outline',
		'outlineWidth',
		'outlineColor',
		'boxShadow',
		'overflow',
		'border',
		'fullWidth',
		'boxShadow'
	] as const

	const props = $props<BoxProps>()

	const [styleProps, otherProps] = $derived.by(() => {
		const otherProps = {} as Record<string, any>
		const styleProps = {} as Record<string, any>

		for (const key in props) {
			const isStyleProp = STYLE_PROPS.includes(key as (typeof STYLE_PROPS)[number])
			if (isStyleProp) styleProps[key] = props[key]
			else otherProps[key] = props[key]
		}

		return [styleProps, otherProps]
	})

	// If value is number string (i.e "48"), append "px" to it.
	// If value starts with "--", wrap it in `var()`.
	// Anything else, don't fuck with it.
	const toCssValue = (value: string | number | undefined): string | undefined => {
		if (value === null || typeof value === 'undefined') return undefined
		if (typeof value === 'number') return `${value}px`
		if (typeof value === 'string' && value.startsWith('--')) return `var(${value})`
		return value
	}

	const LAYOUT_X_MAP = {
		start: 'start',
		end: 'end',
		center: 'center',
		between: 'space-between',
		around: 'space-around',
		evenly: 'space-evenly'
	}

	const LAYOUT_Y_MAP = {
		start: 'start',
		end: 'end',
		center: 'center',
		stretch: 'stretch',
		baseline: 'baseline'
	}

	const flexDirection = $derived.by(() => {
		if (styleProps.isColumn && styleProps.isReverse) return 'column-reverse'
		if (styleProps.isColumn) return 'column'
		if (styleProps.isReverse) return 'row-reverse'
		if (styleProps.isRow) return 'row'
		return 'row'
	})

	const flexWrap = $derived.by(() => {
		if (styleProps.wrap === true) return 'wrap'
		if (styleProps.wrap === false) return 'nowrap'
		if (typeof styleProps.wrap === 'string') return `${styleProps.wrap}`
	})

	const justifyContent = $derived.by(() => {
		const value = styleProps.isColumn ? styleProps.layoutY : styleProps.layoutX
		const target = styleProps.isColumn ? LAYOUT_Y_MAP : LAYOUT_X_MAP
		if (!value) return ''
		return target[value]
	})

	const alignItems = $derived.by(() => {
		const { isColumn, layoutX, layoutY } = styleProps
		const value = isColumn ? layoutX : layoutY
		const target = isColumn ? LAYOUT_X_MAP : LAYOUT_Y_MAP
		if (!value) return ''
		return target[value]
	})

	const display = $derived.by(() => {
		return styleProps.isInline ? 'inline-flex' : 'flex'
	})

	const monoFontClass = $derived(props.monoFont ? 'monoFont' : undefined)
	const classes = $derived([otherProps.class, monoFontClass])

	const gap = $derived.by(() => {
		const { gap, gapX, gapY } = styleProps
		if (gap !== undefined) return toCssValue(gap)
		if (gapX !== undefined && gapY !== undefined) return `${toCssValue(gapY)} ${toCssValue(gapX)}`
		if (gapX !== undefined) return `0 ${toCssValue(gapX)}`
		if (gapY !== undefined) return `${toCssValue(gapY)} 0`
		return undefined
	})

	const padding = $derived.by(() => {
		return styleProps.padding
	})

	const paddingTop = $derived.by(() => {
		if (styleProps.paddingY) return toCssValue(styleProps.paddingY)
		return toCssValue(styleProps.paddingTop)
	})

	const paddingLeft = $derived.by(() => {
		if (styleProps.paddingX) return toCssValue(styleProps.paddingX)
		return toCssValue(styleProps.paddingLeft)
	})

	const paddingBottom = $derived.by(() => {
		if (styleProps.paddingY) return toCssValue(styleProps.paddingY)
		return toCssValue(styleProps.paddingBottom)
	})

	const paddingRight = $derived.by(() => {
		if (styleProps.paddingX) return toCssValue(styleProps.paddingX)
		return toCssValue(styleProps.paddingRight)
	})

	const margin = $derived.by(() => {
		return styleProps.margin
	})

	const marginTop = $derived.by(() => {
		if (styleProps.marginY) return toCssValue(styleProps.marginY)
		return toCssValue(styleProps.marginTop)
	})

	const marginLeft = $derived.by(() => {
		if (styleProps.marginX) return toCssValue(styleProps.marginX)
		return toCssValue(styleProps.marginLeft)
	})

	const marginBottom = $derived.by(() => {
		if (styleProps.marginY) return toCssValue(styleProps.marginY)
		return toCssValue(styleProps.marginBottom)
	})

	const marginRight = $derived.by(() => {
		if (styleProps.marginX) return toCssValue(styleProps.marginX)
		return toCssValue(styleProps.marginRight)
	})

	const height = $derived.by(() => {
		if (styleProps.strictHeight) return toCssValue(styleProps.strictHeight)
		if (!styleProps.height) return undefined
		return toCssValue(styleProps.height)
	})

	const minHeight = $derived.by(() => {
		if (styleProps.strictHeight) return toCssValue(styleProps.strictHeight)
		if (!styleProps.minHeight) return undefined
		return toCssValue(styleProps.minHeight)
	})

	const maxHeight = $derived.by(() => {
		if (styleProps.strictHeight) return toCssValue(styleProps.strictHeight)
		if (!styleProps.maxHeight) return undefined
		return toCssValue(styleProps.maxHeight)
	})

	const width = $derived.by(() => {
		if (styleProps.fullWidth) return '100%'
		if (styleProps.strictWidth) return toCssValue(styleProps.strictWidth)
		if (!styleProps.width) return undefined
		return toCssValue(styleProps.width)
	})

	const minWidth = $derived.by(() => {
		if (styleProps.strictWidth) return toCssValue(styleProps.strictWidth)
		if (!styleProps.minWidth) return undefined
		return toCssValue(styleProps.minWidth)
	})

	const maxWidth = $derived.by(() => {
		if (styleProps.strictWidth) return toCssValue(styleProps.strictWidth)
		if (!styleProps.maxWidth) return undefined
		return toCssValue(styleProps.maxWidth)
	})

	const background = $derived.by(() => {
		if (styleProps.background) return toCssValue(styleProps.background)
		return undefined
	})

	const color = $derived.by(() => {
		if (styleProps.color) return toCssValue(styleProps.color)
		return undefined
	})
</script>

<svelte:element
	this={props.as ?? 'div'}
	class:Box={true}
	class:monoFont={props.monoFont}
	class={otherProps.class}
	{...otherProps}
	style:display
	style:overflow={styleProps.overflow}
	style:flex-direction={flexDirection}
	style:flex-wrap={flexWrap}
	style:justify-content={justifyContent}
	style:align-items={alignItems}
	style:gap
	style:padding
	style:padding-top={paddingTop}
	style:padding-left={paddingLeft}
	style:padding-bottom={paddingBottom}
	style:padding-right={paddingRight}
	style:margin
	style:margin-top={marginTop}
	style:margin-left={marginLeft}
	style:margin-bottom={marginBottom}
	style:margin-right={marginRight}
	style:height
	style:min-height={minHeight}
	style:max-height={maxHeight}
	style:width
	style:min-width={minWidth}
	style:max-width={maxWidth}
	style:background
	style:color
	style:scale={styleProps.scale}
	style:pointer-events={styleProps.pointerEvents}
	style:user-select={styleProps.userSelect}
	style:border-radius={styleProps.radius}
	style:border={styleProps.border}
	style:border-color={styleProps.borderColor}
	style:border-width={styleProps.borderWidth}
	style:border-style={styleProps.borderStyle}
	style:outline={styleProps.outline}
	style:outline-width={styleProps.outlineWidth}
	style:outline-color={styleProps.outlineColor}
	style:--boxShadow={styleProps.boxShadow}
	style:--hoverBoxShadow={styleProps.hoverBoxShadow}
>
	{#if props.children}
		{@render props.children()}
	{/if}
</svelte:element>

<style>
	.Box {
		--boxShadow: none;
		--hoverBoxShadow: none;

		box-shadow: var(--boxShadow);
		transition: box-shadow 0.275s ease-in-out;

		&:hover {
			box-shadow: var(--hoverBoxShadow);
		}
	}
</style>
