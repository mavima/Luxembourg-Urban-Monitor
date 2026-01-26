import {
    AfterViewInit,
    Component,
    ElementRef,
    ViewChild,
    NgZone,
    inject,
} from "@angular/core";

interface LuxMap {
    updateSize(): void;
}

declare const lux: {
    Map: new (options: unknown) => LuxMap;
};

@Component({
    selector: "app-geoportail-map",
    templateUrl: "./geoportail-map.html",
    styleUrls: ["./geoportail-map.scss"],
})
export class GeoportailMapComponent implements AfterViewInit {
    @ViewChild("mapDiv", { static: true })
    mapDiv!: ElementRef<HTMLDivElement>;

    @ViewChild("layerManager", { static: true })
    layerManager!: ElementRef<HTMLDivElement>;

    @ViewChild("bgSelector", { static: true })
    bgSelector!: ElementRef<HTMLDivElement>;

    private readonly zone = inject(NgZone);
    private map!: LuxMap;

    ngAfterViewInit(): void {
        this.zone.runOutsideAngular(() => {
            setTimeout(() => {
                const mapEl = this.mapDiv.nativeElement;

                if (mapEl.clientHeight === 0 || mapEl.clientWidth === 0) {
                    console.warn("Map container has zero size");
                    return;
                }

                this.map = new lux.Map({
                    target: mapEl,
                    bgLayer: "streets_jpeg",
                    layers: ["351", "512", "813", "147"], // road names 351, cycling paths 512, public transport lines 813, stops 147
                    layerOpacities: [0.9, 0.7, 0.7, 0.7],
                    layerVisibilities: [false, false, false, false],
                    layerManager: {
                        target: this.layerManager.nativeElement,
                    },
                    bgSelector: {
                        target: this.bgSelector.nativeElement,
                    },
                    zoom: 14,
                    position: [76825, 75133],
                });
                this.styleGeoportailElements();

                const ro = new ResizeObserver(() => this.map.updateSize());
                ro.observe(mapEl);
            });
        });
    }

    private styleGeoportailElements(): void {
        const host = this.layerManager.nativeElement as HTMLElement;

        const observer = new MutationObserver(() => {
            const ul = host.querySelector(".lux-layer-manager") as HTMLElement;
            const zoom = host.querySelector(".ol-zoom") as HTMLElement;
            const titleClass = "lux-layer-title";

            if (!ul) {
                return;
            }

            // if (zoom) {
            //     zoom.style.setProperty("left", "auto", "important");
            //     zoom.style.setProperty("right", "0.5em", "important");
            // }

            if (!ul.querySelector(`.${titleClass}`)) {
                const li = document.createElement("li");
                li.className = `geoportail ${titleClass}`;
                li.textContent = "Map layers";

                li.style.fontWeight = "600";
                li.style.marginBottom = "0.5rem";
                li.style.fontSize = "13px";
                li.style.textTransform = "uppercase";
                li.style.backgroundColor = "#003366";
                li.style.color = "#FFF";
                li.style.borderBottom = "1px solid #ccc";
                li.style.padding = "0.5rem";
                li.style.marginLeft = "-1rem";
                li.style.marginRight = "-1rem";
                li.style.marginTop = "-1rem";
                li.style.textAlign = "center";

                ul.insertBefore(li, ul.firstChild);
            }

            ul.style.setProperty("position", "absolute", "important");
            ul.style.setProperty("top", "6rem", "important");
            ul.style.setProperty(
                "background",
                "rgba(245,245,245,.9)",
                "important",
            );
            ul.style.setProperty("max-width", "25%", "important");
            ul.style.setProperty("padding", "1rem", "important");

            const labels = ul.querySelectorAll("label");
            labels.forEach((label) => {
                const el = label as HTMLElement;
                el.style.display = "flex";
                el.style.alignItems = "center";
                el.style.gap = "0.5rem";
                el.style.setProperty("font-size", "12px");
                el.style.setProperty("padding-bottom", ".5rem");
            });

            const selector = host.querySelector(
                ".lux-bg-selector",
            ) as HTMLElement;
            if (selector) {
                selector.style.setProperty("padding", "1rem", "important");
            }

            observer.disconnect();
        });

        observer.observe(host, {
            childList: true,
            subtree: true,
        });
    }
}
