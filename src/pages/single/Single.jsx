import Sidebar from '../../components/sidebar/Sidebar'
import SinglePost from '../../components/singlePost/SinglePost'
import TopBar from '../../components/topbar/TopBar';
import './single.scss'


function Single() {
    return (
        <div className='single'>
            <TopBar className='singleTopbar'/>
            <div className='doubles' >
                    <SinglePost  />
                    <Sidebar />
            </div>
        </div>
    )
}

export default Single;
