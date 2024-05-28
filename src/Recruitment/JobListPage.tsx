import './JobListPage.css';
import Top from "../Top";
import JobSearchBar from "./JobSearchBar";
import Footer from "../Footer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBuilding} from "@fortawesome/free-solid-svg-icons";
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import RoomIcon from '@material-ui/icons/Room';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';

interface JobList {
    sector: string;
}

const sectorMap = {
    'store': {
        name: 'Khối cửa hàng',
        backgroundColor: '#EAFAF4',
        color: '#60CCBC',
        filterList: ['Tất cả', 'Ban hàng', 'Cửa hàng', 'Cửa hàng trưởng', 'Kỹ thuật', 'Lễ Tân', 'Thu Ngân', 'Tiếp đón khách hàng'],
    },
    'office': {
        name: 'Khối văn phòng',
        backgroundColor: '#ffefef',
        color: '#FD787E',
        filterList: ['Tất cả', 'Hành chính nhân sự', 'Kinh doanh', 'Mua bán'],
    }
};

const jobList = [
    {
        name: 'Nhân viên tiếp đón khách hàng',
        salary: '2,300,000 - 3,000,000',
        location: 'Thành phố Đà Nẵng, Tỉnh Bình Định, Tỉnh Bình Dương, Tỉnh Đồng Nai, Tỉnh Bà Rịa - Vũng Tàu, Thành phố Hồ Chí Minh',
        deadline: '31/12/2023',
        description: 'Mô tả công việc\n' +
            'MÔ TẢ: \n' +
            '\n' +
            '- Chào đón khách đến cửa hàng - Sắp xếp xe khách hàng gọn gàng \n' +
            '\n' +
            '- Trông giữ xe khách hàng một cách cẩn thận. \n' +
            '\n' +
            '- Dắt xe cho khách khi khách đến và rời cửa hàng \n' +
            '\n' +
            '- Hỗ trợ các công việc tại cửa hàng khi cần \n' +
            '\n' +
            'THỜI GIAN LÀM VIỆC:\n' +
            '\n' +
            '- Ca tối: 18h00 - 21h30\n' +
            '\n' +
            '- Nghỉ 3 ngày/tháng\n' +
            '\n' +
            'YÊU CẦU: \n' +
            '\n' +
            '- Nam từ 18 tuổi - 60 tuổi, sức khỏe tốt \n' +
            '\n' +
            '- Ưu tiên có kinh nghiệm giữ xe/bảo vệ\n' +
            '\n' +
            '- Trung thực, nhanh nhẹn, có thể gắn bó dài lâu. \n' +
            '\n' +
            'QUYỀN LỢI: \n' +
            '\n' +
            '- Thưởng thêm theo chế độ công ty (Làm thêm, gửi xe, sinh nhật, lễ tết,...) \n' +
            '\n' +
            '- Được đào tạo và nâng cao chuyên môn'
    },
    {
        name: 'Nhân viên tiếp đón khách hàng',
        salary: '2,300,000 - 3,000,000',
        location: 'Thành phố Đà Nẵng, Tỉnh Bình Định, Tỉnh Bình Dương, Tỉnh Đồng Nai, Tỉnh Bà Rịa - Vũng Tàu, Thành phố Hồ Chí Minh',
        deadline: '31/12/2023',
        description: 'Mô tả công việc\n' +
            'MÔ TẢ: \n' +
            '\n' +
            '- Chào đón khách đến cửa hàng - Sắp xếp xe khách hàng gọn gàng \n' +
            '\n' +
            '- Trông giữ xe khách hàng một cách cẩn thận. \n' +
            '\n' +
            '- Dắt xe cho khách khi khách đến và rời cửa hàng \n' +
            '\n' +
            '- Hỗ trợ các công việc tại cửa hàng khi cần \n' +
            '\n' +
            'THỜI GIAN LÀM VIỆC:\n' +
            '\n' +
            '- Ca tối: 18h00 - 21h30\n' +
            '\n' +
            '- Nghỉ 3 ngày/tháng\n' +
            '\n' +
            'YÊU CẦU: \n' +
            '\n' +
            '- Nam từ 18 tuổi - 60 tuổi, sức khỏe tốt \n' +
            '\n' +
            '- Ưu tiên có kinh nghiệm giữ xe/bảo vệ\n' +
            '\n' +
            '- Trung thực, nhanh nhẹn, có thể gắn bó dài lâu. \n' +
            '\n' +
            'QUYỀN LỢI: \n' +
            '\n' +
            '- Thưởng thêm theo chế độ công ty (Làm thêm, gửi xe, sinh nhật, lễ tết,...) \n' +
            '\n' +
            '- Được đào tạo và nâng cao chuyên môn'
    },
    {
        name: 'Nhân viên tiếp đón khách hàng',
        salary: '2,300,000 - 3,000,000',
        location: 'Thành phố Đà Nẵng, Tỉnh Bình Định, Tỉnh Bình Dương, Tỉnh Đồng Nai, Tỉnh Bà Rịa - Vũng Tàu, Thành phố Hồ Chí Minh',
        deadline: '31/12/2023',
        description: 'Mô tả công việc\n' +
            'MÔ TẢ: \n' +
            '\n' +
            '- Chào đón khách đến cửa hàng - Sắp xếp xe khách hàng gọn gàng \n' +
            '\n' +
            '- Trông giữ xe khách hàng một cách cẩn thận. \n' +
            '\n' +
            '- Dắt xe cho khách khi khách đến và rời cửa hàng \n' +
            '\n' +
            '- Hỗ trợ các công việc tại cửa hàng khi cần \n' +
            '\n' +
            'THỜI GIAN LÀM VIỆC:\n' +
            '\n' +
            '- Ca tối: 18h00 - 21h30\n' +
            '\n' +
            '- Nghỉ 3 ngày/tháng\n' +
            '\n' +
            'YÊU CẦU: \n' +
            '\n' +
            '- Nam từ 18 tuổi - 60 tuổi, sức khỏe tốt \n' +
            '\n' +
            '- Ưu tiên có kinh nghiệm giữ xe/bảo vệ\n' +
            '\n' +
            '- Trung thực, nhanh nhẹn, có thể gắn bó dài lâu. \n' +
            '\n' +
            'QUYỀN LỢI: \n' +
            '\n' +
            '- Thưởng thêm theo chế độ công ty (Làm thêm, gửi xe, sinh nhật, lễ tết,...) \n' +
            '\n' +
            '- Được đào tạo và nâng cao chuyên môn'
    }
]

export default function JobListPage({sector}: JobList) {
    const {name: title, backgroundColor, color, filterList} = sectorMap[sector as keyof typeof sectorMap];

    return (
        <div className='job-list-page'>
            <Top/>
            <div className='job-list-page-head'>
                <JobSearchBar/>
            </div>
            <div className='job-list-page-main'>
                <div className='job-list-filter'>
                    <div className='job-list-filter-store'>
                        <div className='job-list-filter-title'>
                            <FontAwesomeIcon icon={faBuilding}/>
                            <span>{title}</span>
                        </div>
                        <div className='job-list-filter-list'>
                            {filterList.length > 0 && filterList.map((filter) => {
                                return <div className='job-list-filter-item'>
                                        {filter}
                                    </div>
                            })}
                        </div>
                    </div>
                </div>
                <div className='job-list-body'>
                    <div className='job-list-body-info'>
                        <div className='job-list-body-count'>
                            {jobList.length}
                            {' việc làm'}
                        </div>
                        <div className='job-list-body-title'>
                            {title}
                        </div>
                    </div>
                    <div className='job-list-body-main'>
                        {jobList.length > 0 && jobList.map((job) => {
                            return <div className='job-list-item'>
                                <div className='job-list-item-unit'>
                                    {title}
                                </div>
                                <div className='job-list-item-body'>
                                    <div className='job-list-item-left'>
                                        <div className='job-list-item-name'>
                                            {job.name}
                                        </div>
                                        <div className='job-list-item-left-info'>
                                            <LocalAtmIcon className='job-list-item-icon'/>
                                            <span>{job.salary}</span>
                                        </div>
                                        <div className='job-list-item-left-info'>
                                            <RoomIcon className='job-list-item-icon'/>
                                            <span>{job.location}</span>
                                        </div>
                                    </div>
                                    <div className='job-list-item-right'>
                                        <div className='job-list-item-deadline'>
                                            <WorkOutlineIcon className='job-list-item-icon'/>
                                            <span>Hạn nộp {job.deadline}</span>
                                        </div>
                                        <div className='job-list-item-btn-apply'>
                                            Ứng tuyển ngay
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                    <div className='job-list-body-paging'>

                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}