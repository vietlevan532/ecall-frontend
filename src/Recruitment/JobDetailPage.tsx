import './JobDetailPage.css';
import Top from "../Top";
import Footer from "../Footer";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import RoomIcon from "@material-ui/icons/Room";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import ReactHtmlParser from "react-html-parser";

const jobDetail = {
    name: 'Nhân viên tiếp đón khách hàng',
    salary: '2,300,000 - 3,000,000',
    location: 'Thành phố Đà Nẵng, Tỉnh Bình Định, Tỉnh Bình Dương, Tỉnh Đồng Nai, Tỉnh Bà Rịa - Vũng Tàu, Thành phố Hồ Chí Minh',
    deadline: '31/12/2023',
    description:
        '<p><strong>MÔ TẢ:</strong><br/><br/>- Chào đón khách đến cửa hàng - Sắp xếp xe khách hàng gọn gàng<br/><br/>- Trông giữ xe khách hàng một cách cẩn thận.<br/><br/>- Dắt xe cho khách khi khách đến và rời cửa hàng<br/><br/>- Hỗ trợ các công việc tại cửa hàng khi cần<br/><br/><strong>THỜI GIAN LÀM VIỆC:</strong><br/><br/>- Ca tối: 18h00 - 21h30<br/><br/>- Nghỉ 3 ngày/tháng<br/><br/><strong>YÊU CẦU:</strong><br/><br/>- Nam từ 18 tuổi - 60 tuổi, sức khỏe tốt<br/><br/>- Ưu tiên có kinh nghiệm giữ xe/bảo vệ<br/><br/>- Trung thực, nhanh nhẹn, có thể gắn bó dài lâu.<br/><br/><strong>QUYỀN LỢI:</strong><br/><br/>- Thưởng thêm theo chế độ công ty (Làm thêm, gửi xe, sinh nhật, lễ tết,...)<br/><br/>- Được đào tạo và nâng cao chuyên môn </p>'

}

export default function JobDetailPage() {
    const { name, salary, location, deadline, description } = jobDetail;
    return (
        <div className='job-detail__page'>
            <Top />
            <div className='job-detail__container'>
                <div className='job-detail__wrapper'>
                    <div className='job-detail__body'>
                        <div className='job-detail__main'>
                            <h1 className='job-detail__name'>{name}</h1>
                            <div className='job-detail__description'>
                                <div className="job-detail__description-title">Mô tả công việc</div>
                                <div className='job-detail__description-content'>
                                    {ReactHtmlParser(description)}
                                </div>
                            </div>
                        </div>
                        <div className='job-detail__relation-jobs'>

                        </div>
                    </div>
                    <div className='job-detail__apply-container'>
                        <div className="job-detail__apply-wrapper">
                            <div className="job-detail__name-apply">{name}</div>
                            <div className="job-detail__apply-info">
                                <LocalAtmIcon />
                                <span>{salary}</span>
                            </div>
                            <div className="job-detail__apply-info">
                                <RoomIcon />
                                <span>{location}</span>
                            </div>
                            <div className="job-detail__apply-info">
                                <WorkOutlineIcon className='job-list-item-icon'/>
                                <span>Hạn nộp {deadline}</span>
                            </div>
                            <div className="job-detail__btn-apply">Ứng tuyển</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}