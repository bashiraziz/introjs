import { useState } from "react";
import {
    Form,
    Button,
    Input,
    message,
    Col,
    Row,
    Typography,
    Grid,
    Card
} from "antd";
import "./Feedback.css";

const { TextArea } = Input;
const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const initialValues = {
    fromName: "",
    email: "",
    message: ""
}

function Feedback() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [form] = Form.useForm();
    const { xs } = useBreakpoint();

    const handleSubmitFeedback = async (values) => {
        setIsSubmitting(true)
        try {
            await fetch(process.env.REACT_APP_EMAIL_JS_SEND_URL, {
                method: 'POST',
                headers: new Headers({
                    'content-type': 'application/json',
                }),
                body: JSON.stringify({
                    service_id: process.env.REACT_APP_SERVICE_ID,
                    template_id: process.env.REACT_APP_TEMPLATE_ID,
                    user_id: process.env.REACT_APP_USER_ID,
                    template_params: {
                        ...values,
                        toName: process.env.REACT_APP_TO_NAME,
                        toEmail: process.env.REACT_APP_TO_EMAIL
                    }
                })
            })
            message.success('Submit success!');
            form.resetFields(['fromName', 'email', 'message', 'subject'])
        } catch (error) {
            message.error(error?.text ?? 'Something went wrong please try again')
        } finally {
            setIsSubmitting(false)
        }
    };

    return (
        <Row className="feedback-page">
            <Col
                span={xs ? 'full' : 10}
                offset={xs ? 0 : 8}
            >
                <Card className="feedback-card" style={{
                    overflow: "auto",
                    border: 'none',
                    borderRadius: "4px",
                    boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)"
                }}>
                    <Title className="feedback-heading">Feedback</Title>
                    <Paragraph className="feedback-sub-title">
                        Please use this form to submit any comments, recommendations, or feedback.
                    </Paragraph>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmitFeedback}
                        initialValues={initialValues}
                        name="feedback-form"
                        autoComplete="off"
                    >
                        <Form.Item
                            name="fromName"
                            label="Full Name"
                            rules={[
                                { required: true, message: "Please enter your full name", },
                                { whitespace: true, message: "Full name cannot be empty" },
                                { min: 3, message: "Full name must be at least 3 characters" },
                            ]}
                            hasFeedback
                        >
                            <Input disabled={isSubmitting} />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: "Please enter your email", },
                                { type: "email", message: "Please enter a valid email" },
                            ]}
                            hasFeedback
                        >
                            <Input disabled={isSubmitting} />
                        </Form.Item>

                        <Form.Item
                            name="subject"
                            label="Subject"
                        >
                            <Input disabled={isSubmitting} />
                        </Form.Item>

                        <Form.Item
                            name="message"
                            label="Comment or Message"
                            rules={[
                                { required: true, message: "Please enter your message", },
                                { whitespace: true, message: "Message cannot be empty" },
                                { min: 3, message: "Message must be at least 3 characters" },
                            ]}
                            hasFeedback
                        >
                            <TextArea rows={4} disabled={isSubmitting} />
                        </Form.Item>

                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={isSubmitting}
                            className="send-message-btn"
                        >
                            Send Message
                        </Button>

                    </Form>
                </Card >
            </Col>
        </Row>
    );
}

export default Feedback;
