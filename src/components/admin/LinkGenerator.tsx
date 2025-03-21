
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, Copy, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ShareLinkDialog from "@/components/admin/ShareLinkDialog";

const LinkGenerator: React.FC = () => {
  const { toast } = useToast();
  const [matricula, setMatricula] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const baseUrl = window.location.origin;

  const generateLink = () => {
    if (!matricula) {
      toast({
        title: "Matrícula obrigatória",
        description: "Digite a matrícula para gerar o link",
        variant: "destructive",
      });
      return;
    }

    const link = `${baseUrl}/cliente/cartao-individual?matricula=${matricula}`;
    setGeneratedLink(link);
    toast({
      title: "Link gerado com sucesso",
      description: "Agora você pode copiar ou compartilhar o link",
      className: "bg-[#8cdcd8]/20 border-[#8cdcd8]",
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink).then(() => {
      setLinkCopied(true);
      toast({
        title: "Link copiado!",
        description: "Link copiado para área de transferência",
        className: "bg-[#8cdcd8]/20 border-[#8cdcd8]",
      });
      
      // Reset the copied state after 3 seconds
      setTimeout(() => {
        setLinkCopied(false);
      }, 3000);
    }).catch(err => {
      console.error('Erro ao copiar para área de transferência:', err);
      toast({
        title: "Erro ao copiar link",
        description: "Não foi possível copiar o link",
        variant: "destructive",
      });
    });
  };

  const handleOpenShareDialog = () => {
    if (!matricula) {
      toast({
        title: "Matrícula obrigatória",
        description: "Digite a matrícula para compartilhar o link",
        variant: "destructive",
      });
      return;
    }
    setShareDialogOpen(true);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link className="h-5 w-5 text-[#52aa85]" />
          Gerador de Link
        </CardTitle>
        <CardDescription>
          Gere links pré-preenchidos com a matrícula do funcionário
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="matricula">Matrícula *</Label>
          <Input
            id="matricula"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            placeholder="Digite a matrícula"
            required
          />
        </div>

        {generatedLink && (
          <div className="mt-4 space-y-3">
            <Label>Link Gerado</Label>
            <div className="flex items-center space-x-2">
              <Input 
                readOnly 
                value={generatedLink} 
                className="flex-1"
              />
              <Button 
                onClick={copyToClipboard} 
                size="icon" 
                variant="outline"
                className={linkCopied ? "text-green-600 border-green-600" : ""}
              >
                {linkCopied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          onClick={generateLink} 
          variant="default"
          className="bg-[#52aa85] hover:bg-[#408d6d]"
        >
          Gerar Link
        </Button>
        <Button 
          onClick={handleOpenShareDialog} 
          variant="outline"
          disabled={!matricula || !generatedLink}
        >
          Opções de Compartilhamento
        </Button>
      </CardFooter>

      {matricula && (
        <ShareLinkDialog
          open={shareDialogOpen}
          onOpenChange={setShareDialogOpen}
          matricula={matricula}
        />
      )}
    </Card>
  );
};

export default LinkGenerator;
