import { useAddMoney } from '@/hooks/useManageWallet'
import { MoneyCollectOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal } from 'antd'

interface AddMoneyButtonProps {
  userId: number
  disabled?: boolean
}

interface AddMoneyFormValues {
  balance: number
}

const AddMoneyButton = ({ userId, disabled }: AddMoneyButtonProps) => {
  const [form] = Form.useForm<AddMoneyFormValues>()
  const { doAddMoney, isPending } = useAddMoney()

  const handleAddMoney = () => {
    Modal.confirm({
      title: 'Xác nhận thêm tiền',
      content: (
        <Form form={form} layout="vertical">
          <Form.Item
            name="balance"
            label="Số tiền"
            rules={[
              { required: true, message: 'Vui lòng nhập số tiền' },
              {
                type: 'number',
                min: 1000,
                transform: (value) => Number(value),
                message: 'Số tiền phải lớn hơn 1,000đ',
              },
            ]}
          >
            <Input
              type="number"
              prefix="VND"
              placeholder="Nhập số tiền"
              min={1000}
              step={1000}
            />
          </Form.Item>
        </Form>
      ),
      icon: <PlusCircleOutlined />,
      okText: 'Thêm tiền',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          const values = await form.validateFields()
          doAddMoney({
            userId,
            balance: values.balance,
          })
          form.resetFields()
        } catch (error) {
          // Validation error
          console.log('Validate Failed:', error)
        }
      },
      onCancel: () => {
        form.resetFields()
      },
    })
  }

  return (
    <Button
      type="primary"
      icon={<MoneyCollectOutlined />}
      onClick={handleAddMoney}
      variant="solid"
      color="default"
      disabled={disabled}
      loading={isPending}
    >
      Thêm tiền
    </Button>
  )
}

export default AddMoneyButton
