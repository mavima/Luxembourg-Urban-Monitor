import { ComponentFixture, TestBed } from "@angular/core/testing";

import { GeoportailMap } from "./geoportail-map.component";

describe("GeoportailMap", () => {
    let component: GeoportailMap;
    let fixture: ComponentFixture<GeoportailMap>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GeoportailMap],
        }).compileComponents();

        fixture = TestBed.createComponent(GeoportailMap);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
