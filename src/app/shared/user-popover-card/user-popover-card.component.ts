import {
    Component,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef,
} from "@angular/core";

import { CommonModule } from "@angular/common";
import { EUI_POPOVER, EuiPopoverComponent } from "@eui/components/eui-popover";
import { EUI_CARD } from "@eui/components/eui-card";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { User } from "src/app/core/models/users.model";

@Component({
    selector: "app-user-popover-card",
    standalone: true,
    imports: [CommonModule, ...EUI_POPOVER, ...EUI_CARD, ...EUI_BUTTON],
    templateUrl: "./user-popover-card.component.html",
    styleUrls: ["./user-popover-card.component.scss"],
})
export class UserPopoverCardComponent {
    @Input() user: User | null = null;
    @Input() title = "User details";
    @Output() closed = new EventEmitter<void>();

    @ViewChild("popover", { static: true }) popover!: EuiPopoverComponent;

    open(anchor: ElementRef | HTMLElement): void {
        // Normalize to ElementRef for EUI Popover API
        const elementRef =
            anchor instanceof ElementRef ? anchor : new ElementRef(anchor);
        this.popover.openPopover(elementRef);
    }

    close(): void {
        this.popover?.closePopover();
    }

    avatarUrl(u: User | null): string {
        if (!u) return "";
        return `https://i.pravatar.cc/160?u=${encodeURIComponent(
            u.email ?? String(u.id),
        )}`;
    }

    onClosed(): void {
        this.closed.emit();
    }
}
