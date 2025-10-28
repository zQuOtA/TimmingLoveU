'use client';

import { useSubscription } from '@/hooks/useSubscription';
import { Crown, AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function SubscriptionStatus() {
  const { subscription, isLoading, hasActiveSubscription } = useSubscription();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Clock className="w-5 h-5 animate-spin text-gray-400" />
          <span className="ml-2 text-sm text-gray-500">Carregando...</span>
        </CardContent>
      </Card>
    );
  }

  if (!subscription?.hasSubscription) {
    return (
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <CardTitle className="text-lg">Nenhuma Assinatura Ativa</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-yellow-700">
            Você ainda não possui uma assinatura. Assine agora para desbloquear todos os recursos!
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full bg-pink-500 hover:bg-pink-600">
            <Link href="/pricing">
              <Crown className="w-4 h-4 mr-2" />
              Ver Planos
            </Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const { subscription: sub } = subscription;
  
  if (!sub) {
    return (
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <CardTitle className="text-lg">Erro ao carregar assinatura</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-yellow-700">
            Não foi possível carregar as informações da assinatura.
          </CardDescription>
        </CardContent>
      </Card>
    );
  }
  
  const statusConfig = {
    trial: {
      icon: Clock,
      color: 'blue',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      badgeVariant: 'default' as const,
    },
    active: {
      icon: CheckCircle,
      color: 'green',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      badgeVariant: 'default' as const,
    },
    past_due: {
      icon: AlertCircle,
      color: 'yellow',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-700',
      badgeVariant: 'destructive' as const,
    },
    canceled: {
      icon: XCircle,
      color: 'red',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-700',
      badgeVariant: 'destructive' as const,
    },
  };

  const config = statusConfig[sub.status as keyof typeof statusConfig] || statusConfig.active;
  const Icon = config.icon;

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <Card className={`${config.borderColor} ${config.bgColor}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className={`w-5 h-5 ${config.textColor}`} />
            <CardTitle className="text-lg">Status da Assinatura</CardTitle>
          </div>
          <Badge variant={config.badgeVariant} className="capitalize">
            {sub.isInTrial ? 'Teste Grátis' : sub.status === 'active' ? 'Ativa' : sub.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm font-medium text-gray-700">Plano: {sub.plan.nome}</p>
          <p className="text-sm text-gray-600">
            Provedor: {sub.provider === 'stripe' ? 'Stripe' : 'Mercado Pago'}
          </p>
        </div>

        {sub.isInTrial && (
          <div className={`p-3 rounded-lg ${config.bgColor} border ${config.borderColor}`}>
            <p className={`text-sm font-semibold ${config.textColor}`}>
              🎉 Período de Teste
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {sub.trialDaysLeft} {sub.trialDaysLeft === 1 ? 'dia' : 'dias'} restantes
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Termina em: {formatDate(sub.trialEndsAt)}
            </p>
          </div>
        )}

        {!sub.isInTrial && sub.currentPeriodEnd && (
          <div>
            <p className="text-sm text-gray-600">
              Próxima renovação: {formatDate(sub.currentPeriodEnd)}
            </p>
          </div>
        )}

        {sub?.cancelAtPeriodEnd && (
          <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
            <p className="text-sm font-semibold text-yellow-800">
              Assinatura será cancelada
            </p>
            <p className="text-xs text-yellow-700 mt-1">
              Você terá acesso até {sub.currentPeriodEnd && formatDate(sub.currentPeriodEnd)}
            </p>
          </div>
        )}

        {!hasActiveSubscription && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200">
            <p className="text-sm font-semibold text-red-800">
              Assinatura Inativa
            </p>
            <p className="text-xs text-red-700 mt-1">
              Renove sua assinatura para continuar usando o serviço.
            </p>
          </div>
        )}
      </CardContent>
      {!sub?.cancelAtPeriodEnd && hasActiveSubscription && (
        <CardFooter className="flex gap-2">
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link href="/pricing">Ver Planos</Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={async () => {
              if (confirm('Tem certeza que deseja cancelar sua assinatura?')) {
                try {
                  const response = await fetch('/api/subscription/cancel', {
                    method: 'POST',
                  });
                  const data = await response.json();
                  if (response.ok) {
                    alert(data.message);
                    window.location.reload();
                  } else {
                    alert(data.error || 'Erro ao cancelar assinatura');
                  }
                } catch (error) {
                  alert('Erro ao cancelar assinatura');
                }
              }
            }}
          >
            Cancelar
          </Button>
        </CardFooter>
      )}
      {!hasActiveSubscription && (
        <CardFooter>
          <Button asChild className="w-full bg-pink-500 hover:bg-pink-600">
            <Link href="/pricing">
              <Crown className="w-4 h-4 mr-2" />
              Renovar Assinatura
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
