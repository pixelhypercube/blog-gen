import React from "react";
import Form from "react-bootstrap/Form";
import { Row,Col,Button,Toast } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

class BlogWriter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: '',
            output: '',
            showToast:true
        };

        this.outputRef = React.createRef();
    }

    componentDidMount() {
        const savedTitle = sessionStorage.getItem("title");
        const savedContent = sessionStorage.getItem("content");

        if (savedTitle && savedContent) {
            this.setState({title:savedTitle,content:savedContent});
        }
    }
    
    handleInputChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]:value},()=>{
            sessionStorage.setItem(name,value);
        });
    }

    getOutputHTML = () => {
        const { title, content } = this.state;
        let outputHTML = `<h5>${this.escapeHtml(title)}</h5>\n`;
        const paragraphs = content.split('\n').map(line => `<p>${this.escapeHtml(line)}</p>`).join('\n');

        outputHTML += paragraphs;

        if (this.state.output !== outputHTML) {
            this.setState({ output: outputHTML });
        }
    }

    escapeHtml = (text) => {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    copyToClipboard = () => {
        navigator.clipboard.writeText(this.state.output)
        .then(()=>{
            this.setState({showToast:true});
        })
        .catch((err)=>{
            alert("Failed to copy: ",err);
        });
    }

    componentDidUpdate(prevProps,prevState) {
        if (prevState.title !== this.state.title || prevState.content !== this.state.content) {
            this.getOutputHTML();
        }
    }

    render() {
        return (
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label><h4>Input Title</h4></Form.Label>
                    <Form.Control 
                        name="title"
                        value={this.state.title}
                        placeholder="Enter a title"
                        onChange={this.handleInputChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Row>
                        <Col md={6}>
                            <Form.Group >
                                <Form.Label><h4>Input Content</h4></Form.Label>
                                <Form.Control 
                                    as="textarea"
                                    name="content"
                                    value={this.state.content}
                                    placeholder="Enter content"
                                    rows={5}
                                    onChange={this.handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <h4>Output Preview</h4>
                            <div style={{"border":"1px solid grey",
                                "borderRadius":"10px",
                                "minHeight":"125px",
                                "padding":"10px"}} ref={this.outputRef}>
                                <h5>{this.state.title}</h5>
                                <p>{this.state.content}</p>
                            </div>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Form.Label><h4>Output Text</h4></Form.Label>
                    <Form.Control as="textarea" value={this.state.output} rows={5} readOnly />
                </Form.Group>
                <hr></hr>
                <Form.Group>
                    <Button variant="primary" onClick={this.copyToClipboard}>
                        <i className="bi bi-clipboard"></i> Copy To Clipboard
                    </Button>
                </Form.Group>
                {/* Toast Notification */}
                <Toast 
                    show={this.state.showToast} 
                    onClose={() => this.setState({ showToast: false })} 
                    delay={3000} 
                    autohide 
                    style={{ position: "fixed", bottom: 20, right: 20 }}
                >
                    <Toast.Body>Copied to Clipboard!</Toast.Body>
                </Toast>
            </Form>
        );
    }
}

export default BlogWriter;