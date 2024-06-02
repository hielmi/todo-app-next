import Image from "next/image";
import styles from "./Profile.module.scss";
const Profile = () => {
  return (
    <div className={styles.profile}>
      <div className={styles.profile__header}>
        <div className={styles.profile__header__image}>
          <Image
            src="https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg"
            alt="profile"
            width={50}
            height={50}
          />
        </div>
        <div className={styles.profile__header__info}>
          <h4>{"Hielmi Sulaeman "}</h4>
          <p>Profile</p>
        </div>
        <div className={styles.profile__header__tool}>
          <i className="bx bx-cog"></i>
        </div>
      </div>
    </div>
  );
};

export default Profile;
