import './JobSector.css';

interface JobSector {
    img: string;
    title: string;
    jobs: object[];
    moreButtonContent: string;
}

export default function JobSector({ img, title, jobs, moreButtonContent }: JobSector) {
    return (
        <div className='job-sector'>
            <div className='job-sector-image'>
                <img src={img} />
            </div>
            <div className='job-sector-body'>
                <div className='job-sector-title'>
                    {title}
                </div>
                <div className='job-sector-jobs'>
                    {jobs.length > 0 && jobs.map((job: any) => {
                        return (
                            <div className='job-sector-job'>
                                <p>{job.name}</p>
                            </div>
                        )
                    })}
                </div>
                <div className='job-sector-button-more'>
                    {moreButtonContent}
                </div>
            </div>

        </div>
    )
}