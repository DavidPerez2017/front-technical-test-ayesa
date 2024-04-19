import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzHighlightModule } from 'ng-zorro-antd/core/highlight';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzMentionModule } from 'ng-zorro-antd/mention';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { IconsProviderModule } from '../icons-provider.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function customTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzGridModule,
    NzInputModule,
    NzButtonModule,
    NzFormModule,
    NzMessageModule,
    NzBadgeModule,
    NzBreadCrumbModule,
    NzPopoverModule,
    NzAvatarModule,
    NzCardModule,
    NzModalModule,
    NzProgressModule,
    NzTagModule,
    NzTimelineModule,
    NzSelectModule,
    NzDrawerModule,
    NzToolTipModule,
    NzEmptyModule,
    NzTableModule,
    NzTreeModule,
    NzHighlightModule,
    NzDividerModule,
    NzTreeViewModule,
    NzSegmentedModule,
    NzTransferModule,
    NzSwitchModule,
    NzDatePickerModule,
    NzCheckboxModule,
    NzRadioModule,
    NzDropDownModule,
    NzUploadModule,
    NzSpinModule,
    NzNotificationModule,
    NzAlertModule,
    NzListModule,
    NzCollapseModule,
    NzTabsModule,
    NzMentionModule,
    NzInputNumberModule,
    NzSkeletonModule,
    NzResultModule,
    NzRateModule,
    NzCarouselModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: customTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzGridModule,
    NzInputModule,
    NzButtonModule,
    NzFormModule,
    NzMessageModule,
    NzBadgeModule,
    NzBreadCrumbModule,
    NzPopoverModule,
    NzAvatarModule,
    NzCardModule,
    NzPageHeaderModule,
    NzModalModule,
    NzPopconfirmModule,
    NzProgressModule,
    NzTagModule,
    NzTimelineModule,
    NzSelectModule,
    NzDrawerModule,
    NzToolTipModule,
    NzEmptyModule,
    NzTableModule,
    NzTreeModule,
    NzHighlightModule,
    NzDividerModule,
    NzTreeViewModule,
    NzSegmentedModule,
    NzTransferModule,
    NzSwitchModule,
    NzDatePickerModule,
    NzCheckboxModule,
    NzRadioModule,
    NzDropDownModule,
    NzUploadModule,
    NzSpinModule,
    NzNotificationModule,
    NzAlertModule,
    NzListModule,
    NzCollapseModule,
    NzTabsModule,
    NzMentionModule,
    NzInputNumberModule,
    NzSkeletonModule,
    NzResultModule,
    NzRateModule,
    NzCarouselModule,
    TranslateModule,
  ],
})
export class SharedZorroModule {}
