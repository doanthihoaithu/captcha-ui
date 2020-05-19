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
                <div className="row no-gutter">
                    {
                        Object.keys(data).map(key => (
                            <div
                                className={`col-${12 / Object.keys(data).length} p-0`}
                                style={{ border: '1px solid gray' }}
                            >
                                <div
                                    className="text-center"
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: '24px',
                                        padding: '20px 0',
                                        border: '1px solid gray',
                                    }}
                                >
                                    {key}
                                </div>
                                <List
                                    grid={{
                                        xs: 1,
                                        sm: 1,
                                        md: 1,
                                        lg: 1,
                                        xl: 1,
                                        xxl: 1,
                                    }}
                                    style={{ border: '1px solid gray', }}
                                    dataSource={data[key]}
                                    renderItem={item => (
                                        <List.Item className="d-flex justify-content-center">
                                            <Card
                                                hoverable
                                                style={{ width: '180px' }}
                                                cover={<img alt={item.product_name} src={item.url_images[0]} style={{ padding: '1px' }} />}
                                            >
                                                <Card.Meta title={item.product_name} description={`Score: ${item.score}`} />
                                            </Card>
                                        </List.Item>
                                    )}
                                />
                            </div>
                        ))
                    }
                </div>
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