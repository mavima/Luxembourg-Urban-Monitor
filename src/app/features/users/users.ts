import { Component, OnInit, inject, computed } from "@angular/core";
// import { UsersService, User } from "../../core/services/users.service";
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
} from "@eui/components/externals/charts";
// import { EuiAppShellService } from "@eui/core";
import { CommonModule } from "@angular/common";
import { UsersStore } from "../../core/stores/users.store";

@Component({
    selector: "app-users",
    imports: [
        CommonModule,
        ...EUI_PAGE,
        ...EUI_TABLE,
        ...EUI_CARD,
        EuiApexChartComponent,
    ],
    templateUrl: "./users.html",
    styleUrl: "./users.scss",
})
export class Users implements OnInit {
    private store = inject(UsersStore);
    users = this.store.users;
    loading = this.store.loading;

    ngOnInit(): void {
        this.store.loadUsers();
    }

    series = computed<ApexAxisChartSeries>(() => [
        {
            name: "Avg availability (hours)",
            data: this.store.avgAvailabilityPerDay(),
        },
    ]);

    chart: ApexChart = {
        type: "line",
        height: 350,
        toolbar: { show: false },
    };

    stroke: ApexStroke = {
        curve: "straight",
        width: 3,
    };

    xaxis: ApexXAxis = {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    };

    yaxis: ApexYAxis = {
        min: 0,
        max: 8,
        title: { text: "Hours" },
    };

    // column chart
    seriesColumns = computed(() => [
        {
            name: "Users",
            data: this.store.publishingFrequencyDistribution(),
        },
    ]);

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
        bar: {
            horizontal: false,
            columnWidth: "50%",
        },
    };

    dataLabelsColumns: ApexDataLabels = {
        enabled: false,
    };
}
