import { EUI_PAGE } from "@eui/components/eui-page";
import { EUI_CARD } from "@eui/components/eui-card";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_INPUT_TEXT } from "@eui/components/eui-input-text";
import { EUI_INPUT_GROUP } from "@eui/components/eui-input-group";
import { EUI_BADGE } from "@eui/components/eui-badge";
import { EUI_FEEDBACK_MESSAGE } from "@eui/components/eui-feedback-message";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EuiMaxLengthDirective } from "@eui/components/directives";
import { TranslateModule } from "@ngx-translate/core";
import { EuiTooltipDirective } from "@eui/components/directives";
import { EUI_ALERT } from "@eui/components/eui-alert";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { JsonPipe } from "@angular/common";
import { CommonModule } from "@angular/common";

export const SHARED_UI_MODULES = [
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    EuiMaxLengthDirective,
    EuiTooltipDirective,
    CommonModule,
    ...EUI_ICON,
    ...EUI_LABEL,
    ...EUI_FEEDBACK_MESSAGE,
    ...EUI_BADGE,
    ...EUI_INPUT_GROUP,
    ...EUI_PAGE,
    ...EUI_CARD,
    ...EUI_BUTTON,
    ...EUI_INPUT_TEXT,
    ...EUI_ALERT,
];
