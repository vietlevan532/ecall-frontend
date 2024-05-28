import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import "./ChatBot.css";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function ChatBot() {

    const questionAnswerDictionary = {
        "- Chuông gọi phục vụ là gì và chúng được sử dụng như thế nào?": "Chuông gọi phục vụ là một thiết bị giúp khách hàng gọi phục vụ một cách thuận tiện. Chúng thường được đặt tại các bàn trong nhà hàng hoặc các khu vực phục vụ. Khi khách hàng cần sự giúp đỡ, họ có thể nhấn nút trên chuông để thông báo cho nhân viên.",
        "- Có những loại chuông gọi y tá nào và chúng có tính năng gì khác nhau?": "Có nhiều loại chuông gọi y tá, bao gồm chuông không dây, chuông có màn hình hiển thị thông báo, và chuông tích hợp công nghệ thông minh. Mỗi loại có các tính năng khác nhau như khoảng cách truyền, khả năng tương tác, và tính năng đặc biệt như đèn LED hiển thị.",
        "- Lợi ích của việc sử dụng thẻ rung là gì?": "Thẻ rung là một giải pháp hiệu quả để nhân viên nhận biết khi có yêu cầu hoặc cuộc gọi từ khách hàng. Thẻ rung có thể giúp tăng cường giao tiếp trong nhóm làm việc và giảm thời gian chờ đợi cho khách hàng.",
        "- Có sẵn các màu sắc và kiểu dáng khác nhau cho các sản phẩm không?": "Có, chúng tôi cung cấp nhiều sự lựa chọn về màu sắc và kiểu dáng để phù hợp với sở thích và nhu cầu của khách hàng.",
        "- Có tính năng đặc biệt nào mà tôi nên chú ý?": "Một số tính năng đặc biệt bao gồm tích hợp công nghệ không dây, màn hình hiển thị thông báo chi tiết, và khả năng tương tác với hệ thống thông báo khác.",
        "- Làm thế nào để lắp đặt và sử dụng các thiết bị này?": "Chúng tôi cung cấp hướng dẫn lắp đặt chi tiết và dễ hiểu cùng với các tài liệu hỗ trợ. Nếu có thêm câu hỏi, đội ngũ hỗ trợ khách hàng của chúng tôi sẽ luôn sẵn lòng giúp đỡ.",
        "- Có hỗ trợ kỹ thuật sau khi mua không?": "Chắc chắn rằng chúng tôi cung cấp hỗ trợ kỹ thuật sau khi mua. Bạn có thể liên hệ với đội ngũ hỗ trợ khách hàng của chúng tôi để đặt câu hỏi hoặc nhận sự hỗ trợ khi cần thiết.",
        "- Bảo hành có áp dụng cho tất cả các sản phẩm không?": "Bảo hành áp dụng cho hầu hết các sản phẩm của chúng tôi. Chi tiết về thời gian bảo hành và điều kiện cụ thể có thể được tìm thấy trong chính sách bảo hành của chúng tôi.",
        "- Làm thế nào để đảm bảo chất lượng của các thiết bị bạn cung cấp?": "Chúng tôi đảm bảo chất lượng bằng cách chọn lựa cẩn thận nhà cung cấp và tuân thủ các tiêu chuẩn chất lượng. Mọi sản phẩm đều trải qua kiểm tra chất lượng nghiêm ngặt trước khi đến tay khách hàng.",
        "- Tôi nên làm gì nếu sản phẩm có vấn đề sau khi nhận hàng?": "Trong trường hợp sản phẩm có vấn đề, vui lòng liên hệ với chúng tôi qua trang web hoặc số điện thoại hỗ trợ khách hàng. Chúng tôi sẽ hỗ trợ bạn giải quyết tình huống và cung cấp hướng dẫn đổi/trả hàng nếu cần thiết."
    };

    const [isChatVisible, setIsChatVisible] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState<string[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const messageContainerRef = useRef<HTMLUListElement | null>(null);

    useEffect(() => {
        if (messageContainerRef.current) {
          messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, []);

    const toggleChatVisibility = () => {
        setIsChatVisible(!isChatVisible);
        if (inputRef.current) {
            inputRef.current.checked = !isChatVisible;
        }
        setSelectedAnswer([]);
        setSelectedQuestion([]);
    };

    const handleQuestionSelection = (question: string, answer: string) => {
        setSelectedQuestion((prevQuestion: any) => [...prevQuestion, `${question}`]);
        setSelectedAnswer((prevAnswer: any) => [...prevAnswer, `${answer}`]);
    };

    const renderMessage = () => {
        if (selectedQuestion.length !== 0) {
            return selectedQuestion.map((question, index) => (
                <div key={index}>
                    <li className="right__message">
                        {question}
                    </li>
                    <li className="left__message">
                        <i>- <u>Trả lời</u>:</i> {selectedAnswer[index]}
                        <br />
                        <b>Vui lòng chọn câu hỏi khác:</b>
                            <br />
                            {Object.entries(questionAnswerDictionary).map(([key, value]) => (
                                <Link 
                                    style={{color:'#FFF'}}
                                    to={'#'}
                                    onClick={() =>handleQuestionSelection(key, value)}>
                                    {key}
                                    <br />
                                </Link>
                            ))}
                            <Link
                                style={{color:'#FFF'}}
                                to={'#'}
                                onClick={toggleChatVisibility}>
                                <p style={{marginBottom:'0'}}>Kết thúc (<i>đóng chat</i>)</p>
                            </Link>
                    </li>
                </div>
            ));
        }
    };

    return (
        <div className="chatbot">
            <input type="checkbox" id="show" ref={inputRef}/>
            <label htmlFor="show" className="show__btn" onClick={toggleChatVisibility}>
                <FontAwesomeIcon id="icon" icon={faFacebookMessenger} />
            </label>
            <div className={`wrapper ${isChatVisible ? "visible" : ""}`}>
                <div className="chat__head">
                    <h5>Ecall Bot</h5>
                    <label htmlFor="show" className="close__btn">
                        <FontAwesomeIcon icon={faTimes} onClick={toggleChatVisibility}/>
                    </label>
                </div>
                <p id="chat__guide" style={{color:'black'}}><b>Ecall Bot</b> xin chào. Tôi có thể giúp gì cho bạn?</p>
                <form id="chat__form" action="">
                    <ul className="chat__message" ref={messageContainerRef}>
                        <li className="left__message">
                            <b>Vui lòng chọn câu hỏi:</b>
                            <br />
                            {Object.entries(questionAnswerDictionary).map(([key, value]) => (
                            <Link 
                                style={{color:'#FFF'}} 
                                to={'#'}
                                onClick={() =>handleQuestionSelection(key, value)}>
                                {key}
                                <br />
                            </Link>
                            ))}
                            <Link
                                style={{color:'#FFF'}}
                                to={'#'}
                                onClick={toggleChatVisibility}>
                                <p style={{marginBottom:'0'}}>Kết thúc (<i>đóng chat</i>)</p>
                            </Link>
                        </li>
                        {renderMessage()}
                    </ul>
                    <div className="chat__footer">
                        <input id="typing" type="text" />
                        <FontAwesomeIcon id="icon__send" icon={faPaperPlane} />
                    </div>
                </form>
            </div>
        </div>
    );
}
