import React from "react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { customSelectors } from "../../../slices/channelsSlice";
import FilterContext from "../../../contexts/FilterContext.jsx";

const MessagesHeader = () => {
  const { t } = useTranslation();
const { clean } = useContext(FilterContext);
const currentChannel = useSelector(customSelectors.currentChannel);

if (!currentChannel) return null;

return (
  <div className="bg-white p-3 shadow-sm mb-4">
    <h6># {clean(currentChannel.name)}</h6>
  </div>
);
};

export default MessagesHeader;