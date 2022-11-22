import { defineComponent, ref, type ExtractPropTypes } from 'vue'
import { SmallButton } from './components/smallBtn'
import {
  createNamespace,
  makeStringProp,
  extend,
  preventDefault
} from '../_utils'
import { ButtonType } from './types'
import './index.scss'

export * from './components/smallBtn'

/**
 * 目的是在制作大型业务组件时能暴露hook给外部便捷操作
 */
const btnDefaultText = ref<any>('我是Btn默认填充值，可以通过hook更改：')
export const useBtn = () => {
  console.log('调用了：useBtn')
  return { btnDefaultText }
}

const [name] = createNamespace('button')

type buttonProps = ExtractPropTypes<typeof buttonProps>
const buttonProps = extend(
  {},
  {
    text: String,
    type: makeStringProp<ButtonType>('default'),
    loadingText: String,
    color: String,
    loading: Boolean,
    disabled: Boolean
  }
)

export const Button = defineComponent({
  name,

  props: buttonProps,

  emits: ['click', 'clickSmall'],

  setup(props, { emit, slots }) {
    const onClick = (event: MouseEvent) => {
      if (props.loading) {
        preventDefault(event)
      } else if (!props.disabled) {
        emit('click', event)
      }
    }
    const onClickSmall = (event: MouseEvent) => {
      emit('clickSmall', event)
    }

    const renderText = () => {
      let text
      if (props.loading) {
        text = props.loadingText
      } else {
        text = slots.default ? slots.default() : props.text
      }

      return <span class="text">{text}</span>
    }

    return () => (
      <div>
        <div class="button-body" onClick={onClick}>
          <div class="content">
            {btnDefaultText.value}
            {renderText()}
          </div>
        </div>

        <div style="margin: 40px">------------父子组件分界线------------</div>

        <SmallButton text={renderText} onClick={onClickSmall}></SmallButton>
      </div>
    )
  }
})
