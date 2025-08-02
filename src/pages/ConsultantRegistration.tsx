import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { UserCheck, FileText, DollarSign, Search, MessageSquare, TrendingUp } from "lucide-react";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  specialty: string;
  crea: string;
  states: string[];
  experience: string;
  biography: string;
  paymentMethod: string;
  paymentData: string;
  documents: FileList | null;
  termsAccepted: boolean;
}

export const ConsultantRegistration = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>();
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const { toast } = useToast();

  const states = [
    "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal",
    "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul",
    "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí",
    "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia",
    "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
  ];

  const specialties = [
    "Solo e Nutrição",
    "Fitossanitário",
    "Irrigação e Recursos Hídricos",
    "Planejamento Agrícola",
    "Sementes e Melhoramento",
    "Agricultura de Precisão",
    "Sustentabilidade",
    "Economia Rural",
    "Climatologia Agrícola",
    "Zootecnia"
  ];

  const onSubmit = (data: FormData) => {
    console.log("Dados do formulário:", { ...data, states: selectedStates });
    toast({
      title: "Inscrição enviada com sucesso!",
      description: "Sua inscrição foi recebida e será analisada em até 48 horas.",
    });
  };

  const handleStateToggle = (state: string) => {
    const newStates = selectedStates.includes(state)
      ? selectedStates.filter(s => s !== state)
      : [...selectedStates, state];
    setSelectedStates(newStates);
    setValue("states", newStates);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  Inscrição para Consultor AgroInsight AI
                </CardTitle>
                <p className="text-center text-muted-foreground">
                  Faça parte da nossa rede de especialistas em agricultura
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Dados Pessoais */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Dados Pessoais</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Nome Completo *</Label>
                        <Input
                          id="fullName"
                          {...register("fullName", { required: "Nome é obrigatório" })}
                          className={errors.fullName ? "border-red-500" : ""}
                        />
                        {errors.fullName && (
                          <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="email">E-mail *</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register("email", { 
                            required: "E-mail é obrigatório",
                            pattern: {
                              value: /\S+@\S+\.\S+/,
                              message: "E-mail inválido"
                            }
                          })}
                          className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && (
                          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Telefone *</Label>
                        <Input
                          id="phone"
                          {...register("phone", { required: "Telefone é obrigatório" })}
                          placeholder="(11) 99999-9999"
                          className={errors.phone ? "border-red-500" : ""}
                        />
                        {errors.phone && (
                          <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="crea">CREA ou Registro Profissional *</Label>
                        <Input
                          id="crea"
                          {...register("crea", { required: "CREA é obrigatório" })}
                          placeholder="Ex: SP-123456"
                          className={errors.crea ? "border-red-500" : ""}
                        />
                        {errors.crea && (
                          <p className="text-sm text-red-500 mt-1">{errors.crea.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Especialização */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Especialização</h3>
                    
                    <div>
                      <Label htmlFor="specialty">Área de Especialidade *</Label>
                      <Select onValueChange={(value) => setValue("specialty", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione sua especialidade" />
                        </SelectTrigger>
                        <SelectContent>
                          {specialties.map((specialty) => (
                            <SelectItem key={specialty} value={specialty}>
                              {specialty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Estados ou Regiões que Atende *</Label>
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mt-2 max-h-48 overflow-y-auto border rounded-md p-3">
                        {states.map((state) => (
                          <div key={state} className="flex items-center space-x-2">
                            <Checkbox
                              id={state}
                              checked={selectedStates.includes(state)}
                              onCheckedChange={() => handleStateToggle(state)}
                            />
                            <Label htmlFor={state} className="text-sm">{state}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Experiência */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Experiência Profissional</h3>
                    
                    <div>
                      <Label htmlFor="experience">Experiência Profissional *</Label>
                      <Textarea
                        id="experience"
                        {...register("experience", { required: "Experiência é obrigatória" })}
                        placeholder="Descreva sua experiência profissional, formação acadêmica, cursos e certificações..."
                        rows={4}
                        className={errors.experience ? "border-red-500" : ""}
                      />
                      {errors.experience && (
                        <p className="text-sm text-red-500 mt-1">{errors.experience.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="biography">Mini Biografia *</Label>
                      <Textarea
                        id="biography"
                        {...register("biography", { required: "Biografia é obrigatória" })}
                        placeholder="Conte um pouco sobre você, suas especialidades e diferenciais..."
                        rows={3}
                        className={errors.biography ? "border-red-500" : ""}
                      />
                      {errors.biography && (
                        <p className="text-sm text-red-500 mt-1">{errors.biography.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Documentos */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Documentos</h3>
                    
                    <div>
                      <Label htmlFor="documents">Upload de Documentos *</Label>
                      <Input
                        id="documents"
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        {...register("documents", { required: "Documentos são obrigatórios" })}
                        className={errors.documents ? "border-red-500" : ""}
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Certificado CREA, RG/CPF, Diploma (PDF ou imagem)
                      </p>
                      {errors.documents && (
                        <p className="text-sm text-red-500 mt-1">{errors.documents.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Pagamento */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Dados para Pagamento</h3>
                    
                    <div>
                      <Label htmlFor="paymentMethod">Método de Pagamento *</Label>
                      <Select onValueChange={(value) => setValue("paymentMethod", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o método" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pix">PIX</SelectItem>
                          <SelectItem value="conta">Conta Bancária</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="paymentData">Dados para Pagamento *</Label>
                      <Input
                        id="paymentData"
                        {...register("paymentData", { required: "Dados de pagamento são obrigatórios" })}
                        placeholder="Chave PIX ou dados bancários (banco, agência, conta)"
                        className={errors.paymentData ? "border-red-500" : ""}
                      />
                      {errors.paymentData && (
                        <p className="text-sm text-red-500 mt-1">{errors.paymentData.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Termos */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      {...register("termsAccepted", { required: "Você deve aceitar os termos" })}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      Eu concordo com os <a href="/terms" className="text-primary underline">termos de uso</a> e 
                      <a href="/privacy" className="text-primary underline ml-1">política de privacidade</a> *
                    </Label>
                  </div>
                  {errors.termsAccepted && (
                    <p className="text-sm text-red-500">{errors.termsAccepted.message}</p>
                  )}

                  <Button type="submit" className="w-full" size="lg">
                    Enviar Inscrição
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Card Informativo */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-xl text-center">
                  🧑‍🌾 Torne-se um Consultor AgroInsight AI
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Search className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm">
                      <strong>Listagem como Especialista:</strong> Você será listado como especialista na plataforma e poderá receber solicitações de análise dos nossos usuários.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquare className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm">
                      <strong>Notificações Automáticas:</strong> Assim que uma solicitação compatível com sua especialidade for aberta, você será notificado e poderá aceitá-la.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm">
                      <strong>Relatórios Diretos:</strong> Após análise, envie seu relatório diretamente pela plataforma.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm">
                      <strong>Pagamento Garantido:</strong> Ao concluir a consultoria, você receberá o valor diretamente na sua conta ou via PIX.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm">
                      <strong>Controle Total:</strong> O pagamento é feito por análise realizada, e você pode acompanhar tudo em seu painel de consultor.
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">💰 Potencial de Ganhos</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Análise de Solo: R$ 150-300</li>
                    <li>• Consultoria Fitossanitária: R$ 200-400</li>
                    <li>• Planejamento Agrícola: R$ 300-600</li>
                    <li>• Análise Completa: R$ 500-1.000</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};