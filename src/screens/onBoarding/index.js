import React, { useState } from "react";
import { iconpathurl } from "../../assets/iconpath";
import OnboardingScreenComp from "../../components/onBoarding";
import { useSelector } from "react-redux";
import { strings } from "../../constants/strings";
const OnboardingScreen = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);
  //getting type of user from store
  const userType = useSelector((state) => state?.authSlice?.userType);
  const onboardingData = [
    {
      id: 1,
      title:
        userType == 3
          ? strings.ownerOnboardingTitle
          : strings.driverOnboadringTxt1,
      description:
        userType == 3
          ? strings.ownerOnboardingTxt1
          : strings.driverOnboadringsubTxt1,
      image:
        userType === 3 ? iconpathurl.ownerOnBoarding : iconpathurl.onBoarding1,
    },
    {
      id: 2,
      title:
        userType == 3
          ? strings.ownerOnboardingTitle1
          : strings.driverOnboadringTxt2,
      description:
        userType == 3
          ? strings.ownerOnboardingTxt2
          : strings.driverOnboadringsubTxt2,
      image:
        userType === 3 ? iconpathurl.ownerOnBoarding1 : iconpathurl.onBoarding2,
    },
    {
      id: 3,
      title:
        userType == 3
          ? strings.ownerOnboardingTitle2
          : strings.driverOnboadringTxt3,
      description:
        userType == 3
          ? strings.ownerOnboardingTxt3
          : strings.driverOnboadringsubTxt3,
      image:
        userType === 3 ? iconpathurl.ownerOnBoarding2 : iconpathurl.onBoarding3,
    },
  ];

  return (
    <OnboardingScreenComp
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      onboardingData={onboardingData}
    />
  );
};

export default OnboardingScreen;
