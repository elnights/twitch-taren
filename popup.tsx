import { useEffect, useState } from "react";
import { useStorage } from "@plasmohq/storage/hook";
import keyBy from 'lodash/keyBy';
import sortBy from 'lodash/sortBy';
import classNames from "classnames";

import '~/styles/popup.scss';
async function queryCurrentStreamers() {
  let currentStreamers = (await chrome.tabs.query({
    windowId: chrome.windows.WINDOW_ID_CURRENT,
    url: 'https://www.twitch.tv/*'
  })).map(({url}) => {
    let urlO = new URL(url);
    let user = urlO.pathname.slice(1);

    return {user, url};
  });

  let streamersMap = keyBy(currentStreamers, 'user');

  return streamersMap;
}

function IndexPopup() {
  const [volumes] = useStorage("volumes", {});
  const [currentStreamers, setCurrentStreamers] = useState({});

  useEffect(function() {
    queryCurrentStreamers().then(setCurrentStreamers);
  });

  let savedStreamers = Object.entries(volumes).map(([user, volume]) => ({
      user,
      volume,
      isCurrent: currentStreamers[user],
      sortOrder: currentStreamers[user] ? 1 : 2
  }));

  let sortedStreamers = sortBy(savedStreamers, ['sortOrder', 'user']);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16,
        width: 250,
      }}>
      <h2>
        Ебать ты Вася!
      </h2>
      <table>
        <tbody>
          {sortedStreamers.map(({user, volume, isCurrent}) => (
            <tr
              key={user}
            >
              <td
                className={classNames({'is-current': isCurrent})}
              >
                {user}
              </td>
              <td>{Math.round(volume.toString() * 100) + '%'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default IndexPopup
