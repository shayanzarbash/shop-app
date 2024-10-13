import { Base, Button, Flex, Icon, Image, Loading, Text } from "ui-kit";
import {
  InsuranceCardContainer,
  StyledInsuranceCard,
} from "./insurance-offers-card.style";

import t from "@setareyek/i18n";
import { Price } from "components";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IThirdPartyOffers } from "../../../third-party.interface";

interface IInsuranceOffersCard {
  insuranceData: IThirdPartyOffers[] | undefined;
}

const InsuranceOffersCard = (props: IInsuranceOffersCard) => {
  const { insuranceData, isLoading } = props;
  const navigate = useNavigate();
  const [openStates, setOpenStates] = useState<boolean[]>(() =>
    insuranceData ? new Array(insuranceData.length).fill(false) : []
  );
  const toggleOpen = (index: number) => {
    const newOpenStates = [...openStates];
    newOpenStates[index] = !newOpenStates[index];
    setOpenStates(newOpenStates);
  };
  // const haveDiscount =
  //   insuranceData && insuranceData?.DiscountPrice !== InsuranceData?.TotalPrice;

  const onOrderClickEventHandler = () => {
    navigate("/vehicle/third-party-insurance/owner-information");
  };

  const localData =
    JSON.parse(localStorage.getItem("setCompanyNameFilter") as string) || [];

  const filterdData =
    insuranceData?.filter(
      (item) => !localData.length || localData.includes(item.CompanyKey)
    ) ?? [];

  return (
    <InsuranceCardContainer>
      {isLoading ? (
        <Loading size={40} />
      ) : !filterdData.length ? (
        <Flex justifyContent="center" alignItems={"center"} mt={24}>
          <Text
            width="100%"
            textAlign="center"
            variant={"caption1"}
            bgColor={6}
            padding="12px 20px"
            borderRadius={16}
            fontWeight={"bold"}
          >
            {t("notInsuranceFound")}
          </Text>
        </Flex>
      ) : (
        filterdData.map((item, index) => {
          return (
            <StyledInsuranceCard
              width="100%"
              borderRadius={12}
              borderColor={2}
              mt={12}
              bgColor={3}
            >
              <Flex width="100%" bgColor={3} borderColor={2} borderRadius={16}>
                <Base
                  width="100%"
                  bgColor={1}
                  borderRadius={16}
                  padding="12px 16px"
                  className="info-box"
                >
                  <Flex>
                    {item?.ResponsivenessRate ? (
                      <Flex flexDirection={"column"} gap={4}>
                        <Text
                          variant="caption2"
                          fontWeight="bold"
                          textColor={12}
                          className="discount-label"
                        >
                          {item?.SatisfactionRate} {t("from")}
                          {item?.ResponsivenessRate}
                        </Text>
                        <Text
                          className="discount-label-text"
                          variant={"caption2"}
                        >
                          {t("installmentsWithoutCheck")}
                        </Text>
                      </Flex>
                    ) : null}
                  </Flex>
                  <Flex
                    justifyContent="flex-start"
                    alignItems="flex-end"
                    className="border-bottom-2"
                    pb={12}
                  >
                    <Image
                      className="insurance-logo-wrapper"
                      borderColor={2}
                      maxWidth={38}
                      borderRadius={4}
                      padding="2px"
                      maxHeight={38}
                      src={`https://bimebazar.com/${item?.Logo}`}
                      alt=""
                    />
                    <Flex flexDirection="column" alignItems="flex-start" mr={8}>
                      <Text variant="body" fontWeight="bold">
                        {t("insuranceCompanyName", {
                          name: item?.CompanyName,
                        })}
                      </Text>
                      <Text variant="caption2" fontWeight="regular">
                        {t("paymentBranchNumber", {
                          number: String(
                            item?.BranchCount ? item?.BranchCount : 0
                          ),
                        })}
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    mt={12}
                    minHeight={48}
                  >
                    <Flex flexDirection="column" alignItems="flex-start">
                      {item?.Prices?.map((price) => {
                        return (
                          <>
                            <Price
                              textColor={9}
                              variant="title2"
                              fontWeight="bold"
                              unitProps={{
                                variant: "caption1",
                                fontWeight: "regular",
                                textColor: 9,
                              }}
                              amount={price?.TotalPrice}
                            />
                            {price?.DiscountPrice > 0 ? (
                              <Price
                                className="total-price"
                                variant="caption2"
                                fontWeight="bold"
                                textColor={3}
                                unitProps={{
                                  variant: "caption1",
                                  fontWeight: "regular",
                                  textColor: 3,
                                }}
                                amount={price?.DiscountPrice}
                              />
                            ) : null}
                          </>
                        );
                      })}
                    </Flex>
                    <Button
                      variant="outlined"
                      size="small"
                      className="order-btn"
                      maxWidth={128}
                      onClick={onOrderClickEventHandler}
                    >
                      {t("cachePurches")}
                    </Button>
                  </Flex>
                </Base>
              </Flex>
              <Base>
                <Base
                  className={`extra-info-wrapper ${
                    openStates[index] ? "open" : "close"
                  }`}
                  padding="0px 12px"
                >
                  <Base mt={8} padding="0px 0px 8px 0px">
                    {item?.AdditionalDetail ? (
                      <Flex
                        justifyContent="flex-start"
                        alignItems="center"
                        mt={4}
                        className="hr"
                      >
                        <Icon type="GreenTick" size={12} />
                        <Text variant="caption2" fontWeight="regular" mr={8}>
                          {item?.AdditionalDetail}
                        </Text>
                      </Flex>
                    ) : null}
                  </Base>
                  <Base mt={8} className="border-bottom-2" pb={12}>
                    <Flex justifyContent="space-between">
                      <Text variant="caption1" fontWeight="regular">
                        {t("penaltyForEveryDayLate")}:
                      </Text>
                      <Price
                        variant="caption1"
                        fontWeight="bold"
                        unitProps={{
                          variant: "caption2",
                          fontWeight: "regular",
                        }}
                        amount={item?.DailyPenalty}
                      />
                    </Flex>
                    <Flex justifyContent="space-between" mt={4}>
                      <Text variant="caption1" fontWeight="regular">
                        {t("numberOfDaysLate")}:
                      </Text>
                      <Flex justifyContent="flex-end">
                        <Text variant="caption1" fontWeight="bold">
                          {item?.LateDayCount}
                        </Text>
                        <Text variant="caption2" fontWeight="regular" mr={4}>
                          {t("day")}
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex justifyContent="space-between" mt={4}>
                      <Text
                        variant="caption1"
                        fontWeight="regular"
                        textColor={10}
                      >
                        {t("totalLateFine")}:
                      </Text>
                      <Flex justifyContent="flex-end" className="penalty-label">
                        <Price
                          variant="caption1"
                          fontWeight="bold"
                          textColor={10}
                          unitProps={{
                            variant: "caption1",
                            fontWeight: "bold",
                            textColor: 10,
                          }}
                          amount={item?.TotalPenalty}
                        />
                      </Flex>
                    </Flex>
                  </Base>
                </Base>
                <Flex
                  bgColor={3}
                  borderRadius={12}
                  justifyContent="center"
                  padding="2px 16px"
                >
                  <Flex
                    justifyContent="center"
                    onClick={() => toggleOpen(index)}
                    // onClick={() => setShowDetail((detail) => !detail)}
                  >
                    <Text
                      variant="caption2"
                      fontWeight="regular"
                      textColor={1}
                      ml={8}
                      className={
                        openStates[index] ? "close-details" : "open-details"
                      }
                    >
                      {openStates[index] ? t("closeDetails") : t("moreDetails")}
                    </Text>
                    <Icon
                      type="Expand-2"
                      loadSvg
                      borderColor={3}
                      width={18}
                      height={18}
                      className={
                        openStates[index] ? "expand-open" : "expand-close"
                      }
                    />
                  </Flex>
                </Flex>
              </Base>
            </StyledInsuranceCard>
          );
        })
      )}
    </InsuranceCardContainer>
  );
};

export default InsuranceOffersCard;
