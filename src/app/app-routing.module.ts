import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './services/auth.guard';
import { WalletComponent } from './wallet/wallet.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'ReceiveCredential/:sessionId', redirectTo: '/wallet/:sessionId' },
  { path: 'login', component: LoginComponent },
  { path: 'wallet', component: WalletComponent, canActivate: [AuthGuard] },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
