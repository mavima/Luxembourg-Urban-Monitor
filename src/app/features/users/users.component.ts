import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";

import { EUI_PAGE } from "@eui/components/eui-page";
import { EUI_TABLE } from "@eui/components/eui-table";
import { EUI_CARD } from "@eui/components/eui-card";
import {
    EuiApexChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexStroke,
    ApexPlotOptions,
    ApexDataLabels,
    ApexYAxis,
} from "@eui/components/externals/charts";

import { UsersActions } from "../../core/stores/users/users.actions";
import {
    selectUsers,
    selectLoading,
    selectAvgAvailabilityPerDay,
    selectPublishingFrequencyDistribution,
    selectUsersPerLocation,
} from "../../core/stores/users/users.selectors";

@Component({
    selector: "app-users",
    standalone: true,
    imports: [
        CommonModule,
        ...EUI_PAGE,
        ...EUI_TABLE,
        ...EUI_CARD,
        EuiApexChartComponent,
    ],
    templateUrl: "./users.component.html",
    styleUrl: "./users.component.scss",
})
export class Users implements OnInit {
    private store = inject(Store);

    // NgRx selectors as Observables
    users$ = this.store.select(selectUsers);
    loading$ = this.store.select(selectLoading);
    avgAvailabilityPerDay$ = this.store.select(selectAvgAvailabilityPerDay);
    publishingFrequencyDistribution$ = this.store.select(
        selectPublishingFrequencyDistribution,
    );
    usersPerLocation$ = this.store.select(selectUsersPerLocation);

    ngOnInit(): void {
        // trigger loading once
        this.store.dispatch(UsersActions.loadUsers());
    }

    // Chart configs (static)
    chart: ApexChart = { type: "line", height: 350, toolbar: { show: false } };
    stroke: ApexStroke = { curve: "straight", width: 3 };
    xaxis: ApexXAxis = { categories: ["Mon", "Tue", "Wed", "Thu", "Fri"] };
    yaxis: ApexYAxis = { min: 0, max: 8, title: { text: "Hours" } };

    chartColumns: ApexChart = {
        type: "bar",
        height: 350,
        toolbar: { show: false },
    };
    xaxisColumns: ApexXAxis = {
        categories: [
            "Less often",
            "Once a month",
            "2–3 times a month",
            "Once a week",
            "More often",
        ],
    };
    plotOptions: ApexPlotOptions = {
        bar: { horizontal: false, columnWidth: "50%" },
    };
    dataLabelsColumns: ApexDataLabels = { enabled: false };

    donutChart: ApexChart = { type: "donut", height: 350 };
    donutDataLabels = { enabled: true };
}
