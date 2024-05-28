import './JobSearchBar.css';
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import SearchIcon from '@material-ui/icons/Search';

export default function JobSearchBar() {
    const [position, setPosition] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    return (
        <div className='job-search-bar'>
            <div className='job-position'>
                <p>Bạn đang tìm kiếm</p>
                <input
                    type='text'
                    placeholder='Việc làm, vị trí ứng tuyển...'
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                />
            </div>
            <div className='job-location'>
                <div className='job-location-left'>
                    <p>Nơi bạn muốn làm việc</p>
                    <p>Hà Nội</p>
                </div>
                <FontAwesomeIcon icon={faCaretDown} />
            </div>
            <div className='job-search'>
                <button>
                    <SearchIcon />
                    <span>Tìm kiếm</span>
                </button>
            </div>
        </div>

    )
}