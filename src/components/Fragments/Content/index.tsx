import { useState } from "react";
import styles from "./Content.module.scss";
const Content = () => {
  const [date, setDate] = useState(new Date());

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    year: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return (
    <div className={styles.content}>
      <div className={styles.content__header}>
        <h1>{"Home"}</h1>
        <p>{formattedDate}</p>
      </div>
      <div className={styles.content__body}>
        <div className={styles.content__body__item}>
          <div className={styles.content__body__item__checkbox}>
            <input type="checkbox" />
          </div>
          <div className={styles.content__body__item__desc}>
            <h4>{"Todo 1"}</h4>
            <p>{"Description"}</p>
          </div>
          <div className={styles.content__body__item__fav}>
            <i className="bx bx-star"></i>
          </div>
        </div>
        <div className={styles.content__body__item}>
          <div className={styles.content__body__item__checkbox}>
            <input type="checkbox" />
          </div>
          <div className={styles.content__body__item__desc}>
            <h4>{"Todo 1"}</h4>
            <p>{"Description"}</p>
          </div>
          <div className={styles.content__body__item__fav}>
            <i className="bx bx-star"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
