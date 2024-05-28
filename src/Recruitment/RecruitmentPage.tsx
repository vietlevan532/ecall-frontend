import './RecruitmentPage.css';
import Footer from "../Footer";
import Top from "../Top";
import JobSearchBar from "./JobSearchBar";
import JobSector from "./JobSector";

const storeJobs = [
    {
        name: 'Nhân viên tiếp tân',
        content: 'Content A',
    }
];

const officeJobs = [
    {
        name: 'Trưởng Ngành Hàng',
        content: 'Content A',
    }
];

export default function RecruitmentPage() {

    return (
        <div className='recruitment-page'>
            <Top />
            <div className='recruitment-page-head'>
                <JobSearchBar />
            </div>
            <main className='recruitment-page-main'>
                <div className='job-sector-container'>
                    <JobSector
                        img='https://hrw.hstatic.net/200000539775/24/recruitment/1ef5f566b32544059312d9c9d85acaaa.png'
                        title='Khối cửa hàng'
                        jobs={storeJobs}
                        moreButtonContent='Xem tất cả công việc khối cửa hàng'
                    />
                    <JobSector
                        img='https://hrw.hstatic.net/200000539775/24/recruitment/cc96550ac804408e9aec2853c85963c7.png'
                        title='Khối văn phòng'
                        jobs={officeJobs}
                        moreButtonContent='Xem tất cả công việc khối văn phòng'
                    />
                </div>
            </main>
            <Footer />
        </div>
    )
}