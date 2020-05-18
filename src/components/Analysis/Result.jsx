import React, { useState, useEffect } from 'react'
import { Modal, Button, Card, List } from 'antd';

function Result({ data }) {
    const [visible, setVisibility] = useState(false)

    return (
        <div>
            <Button type="primary" onClick={() => setVisibility(true)} size={'large'}>
                Show result
            </Button>
            <Modal
                title="Analysis Result"
                visible={visible}
                footer={false}
                onCancel={() => setVisibility(false)}
                width={1000}
            >
                <List
                    grid={{
                        xs: 4,
                        sm: 4,
                        md: 4,
                        lg: 4,
                        xl: 4,
                        xxl: 4,
                    }}
                    dataSource={data.text}
                    renderItem={item => (
                        <List.Item>
                            <Card
                                hoverable
                                style={{ width: 180 }}
                                cover={<img alt={item.product_name} src={item.url_images[0]} style={{ padding: '1px' }} />}
                            >
                                <Card.Meta title={item.product_name} description={item.price + ' VNĐ'} />
                            </Card>
                        </List.Item>
                    )}
                />
                {/* {
                    data.map((item, index) => (
                        <Card
                            key={index}
                            hoverable
                            style={{ width: 240 }}
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                        >
                            <Card.Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                    ))
                } */}
            </Modal>
        </div>
    )
}

export default Result