import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "../../Components/Header/Header";
import Card from "../../Shared/Card/Card";
import s from "./ScrollingList.module.scss";

const ScrollingList = () => {
  const [items, setItems] = useState(Array.from({ length: 10 }));

  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1 secs
    setTimeout(() => {
      setItems(items.concat(Array.from({ length: 10 })));
    }, 1000);
  };

  const RenderItems = ({ index }) => {
    return (
      <Card>
        <div className={`row`}>
          <p className={`headerTitleRequired`}>{`Card - ${index}`}</p>
        </div>
      </Card>
    );
  };

  return (
    <React.Fragment>
      <Header title={"Infinite Scrolling List"} showLogout={true}></Header>
      <div className={s.scrollWrapper}>
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {items.map((item, index) => (
            <div key={index}>{<RenderItems index={index}></RenderItems>}</div>
          ))}
        </InfiniteScroll>
      </div>
    </React.Fragment>
  );
};

export default ScrollingList;
