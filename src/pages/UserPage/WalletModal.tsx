import { useGetEWalletByUserId } from '@/hooks/useManageWallet'
import { WalletOutlined } from '@ant-design/icons'
import { Button, Modal, Spin } from 'antd'
import { useState } from 'react'
import AddMoneyButton from './AddMoneyButton'

interface WalletModalProps {
  userId: number
  userName: string
}

const WalletModal = ({ userId, userName }: WalletModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { getEWalletByUser, isLoading } = useGetEWalletByUserId(userId)
  const balance = getEWalletByUser?.data?.data?.balance ?? 0

  return (
    <>
      <Button
        type="primary"
        color="default"
        icon={<WalletOutlined />}
        onClick={() => setIsModalOpen(true)}
        variant="outlined"
      >
        Xem ví
      </Button>

      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <WalletOutlined />
            <span>Ví của {userName}</span>
          </div>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Spin />
          </div>
        ) : (
          <div>
            <div
              style={{
                marginBottom: '24px',
                background: '#f5f5f5',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <h3
                style={{
                  margin: 0,
                  marginBottom: '8px',
                  color: '#595959',
                }}
              >
                Số dư hiện tại
              </h3>
              <p
                style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#1890ff',
                  margin: 0,
                }}
              >
                {balance.toLocaleString('vi-VN')} VND
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
              }}
            >
              <AddMoneyButton userId={userId} />
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}

export default WalletModal
