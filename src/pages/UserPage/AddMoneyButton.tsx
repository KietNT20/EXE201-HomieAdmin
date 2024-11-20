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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value) {
      const numericValue = parseInt(value)
      form.setFieldValue('balance', numericValue)
    } else {
      form.setFieldValue('balance', null)
    }
  }

  const formatDisplayValue = (value: number | null) => {
    if (!value) return ''
    return Math.floor(value).toString()
  }

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
                transform: (value) => Number(value),
                message: 'Nhập 1 là thêm 1.000đ và -1 là trừ 1.000đ',
              },
            ]}
          >
            <Input
              type="text"
              prefix="VND"
              placeholder="Nhập số tiền (1 = 1.000đ)"
              onChange={handleInputChange}
              value={formatDisplayValue(
                form.getFieldValue('balance') as number | null,
              )}
            />
          </Form.Item>
          {/* Hiển thị số tiền thực tế */}
          {form.getFieldValue('balance') && (
            <div style={{ marginTop: -20, marginBottom: 16 }}>
              <small style={{ color: '#666' }}>
                Số tiền thực tế:{' '}
                {(form.getFieldValue('balance') as number)?.toLocaleString(
                  'vi-VN',
                )}
                đ
              </small>
            </div>
          )}
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
            balance: values.balance * 1000,
          })
          form.resetFields()
        } catch (error) {
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
