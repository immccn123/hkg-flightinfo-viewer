<script setup lang="ts">
import { computed, onDeactivated, ref } from "vue";
import {
  DepartureData,
  DayFlight,
  DisplayDepartureData,
} from "../interfaces/hkg";
import { format, addDays, subDays, subHours, addHours } from "date-fns";
import {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from "@coreui/vue";

const flightData = ref<DepartureData>([]);
const BACKEND_URL = import.meta.env.VITE_HKG_FLIGHTINFO_URL as string;
const dateFormat = "yyyy-MM-dd";

const fetcher = async () => {
  const today = new Date();
  const tomorrow = addDays(today, 1);
  const yesterday = subDays(today, 1);

  const formattedToday = format(today, dateFormat);
  const formattedYesterday = format(yesterday, dateFormat);
  const formattedTomorrow = format(tomorrow, dateFormat);

  const departureData = [];

  departureData.push(
    await fetch(
      `${BACKEND_URL}/?date=${formattedToday}&lang=en&cargo=false&arrival=false`
    ).then((resp) => {
      return resp.json() as unknown as DepartureData;
    })
  );
  departureData.push(
    await fetch(
      `${BACKEND_URL}/?date=${formattedYesterday}&lang=en&cargo=false&arrival=false`
    ).then((resp) => {
      return resp.json() as unknown as DepartureData;
    })
  );
  departureData.push(
    await fetch(
      `${BACKEND_URL}/?date=${formattedTomorrow}&lang=en&cargo=false&arrival=false`
    ).then((resp) => {
      return resp.json() as unknown as DepartureData;
    })
  );

  const mergedData: DayFlight[] = [];

  departureData.forEach((data) => {
    data.forEach((day) => {
      const existingDay = mergedData.find((d) => d.date === day.date);

      if (existingDay) {
        existingDay.list = [...existingDay.list, ...day.list];
      } else {
        mergedData.push({ ...day });
      }
    });
  });

  flightData.value = mergedData;
};

fetcher();

const timer = setInterval(fetcher, 30 * 1000);
const displayFlightData = computed<DisplayDepartureData[]>(() => {
  const res: DisplayDepartureData[] = [];

  flightData.value.forEach((day) => {
    day.list.forEach((flight) => {
      res.push({
        date: new Date(day.date + "T" + flight.time + "+08:00"),
        flight,
      });
    });
  });

  const today = new Date();
  const from = subHours(today, 1);
  const to = addHours(today, 12);

  const ret = res
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .filter(
      (x) =>
        x.flight.status.includes("Est") ||
        x.flight.status.includes("Boarding") ||
        (x.date.getTime() >= from.getTime() && x.date.getTime() <= to.getTime())
    );

  // console.log(ret);
  return ret;
});

onDeactivated(() => {
  clearInterval(timer);
});

const destToString = (arr: string[]) => {
  if (arr.length === 1) {
    return arr[0];
  } else {
    const lastItem = arr[arr.length - 1];
    const joinedString = arr.slice(0, -1).join(" and ");
    return `${lastItem} (via ${joinedString})`;
  }
};

const getColor = (status: string) => {
  if (status.includes("Dep")) return "light";
  if (status.includes("Gate Closed")) return "light";
  if (status.includes("Final Call")) return "danger";
  if (status.includes("Est at")) return "info";
  if (status.includes("Boarding Soon")) return "primary";
  if (status.includes("Boarding")) return "success";
  if (status.includes("Cancelled")) return "danger";
};
</script>

<template>
  <CTable>
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope="col">Time</CTableHeaderCell>
        <CTableHeaderCell scope="col">Flight</CTableHeaderCell>
        <CTableHeaderCell scope="col">Dest</CTableHeaderCell>
        <CTableHeaderCell scope="col">Status</CTableHeaderCell>
        <CTableHeaderCell scope="col">Gate</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      <CTableRow
        v-for="flight in displayFlightData"
        :color="getColor(flight.flight.status)"
      >
        <CTableHeaderCell scope="row">{{
          format(flight.date, "HH:mm")
        }}</CTableHeaderCell>
        <CTableDataCell>
          {{ flight.flight.flight.map(({ no }) => no).join(" / ") }}
        </CTableDataCell>
        <CTableDataCell>
          {{ destToString(flight.flight.destination) }}
        </CTableDataCell>
        <CTableDataCell>
          {{ flight.flight.status === "" ? "Scheduled" : flight.flight.status }}
        </CTableDataCell>
        <CTableDataCell>
          {{
            flight.flight.gate === "" ? "To be determined" : flight.flight.gate
          }}
        </CTableDataCell>
      </CTableRow>
    </CTableBody>
  </CTable>
</template>

<style>
swiper-slide {
  text-align: center;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
}

swiper-container {
  width: 100%;
  height: 100%;
}

swiper-slide p {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
