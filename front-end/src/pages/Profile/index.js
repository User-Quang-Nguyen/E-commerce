import DisplayInfo from "./displayInfo";
import "../../asset/styles.css"
const Profile = ({ authState }) => {
    return (
        <div className="display-center">
            <DisplayInfo authState={authState} />
        </div>
    )
}

export default Profile;