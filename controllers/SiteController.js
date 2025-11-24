import Dna from '../models/dna.js';
import Dinossauro from '../models/dinossauro.js';
import Cientista from '../models/cientista.js';
import ExperimentoGenetico from '../models/experimentoGenetico.js';

export default class SiteController {

    constructor() {
        this.home = async (req, res) => {
          try {
            const dnasRaw = await Dna.find().sort({_id: -1}).limit(3);
            const dinosRaw = await Dinossauro.find().sort({_id: -1}).limit(3);
            const cientistasRaw = await Cientista.find().sort({_id: -1}).limit(4);
            const expRaw = await ExperimentoGenetico.find().sort({_id: -1}).limit(2);

            const dnas = dnasRaw.map(dna => ({
              _id: dna._id,
              sequenciaGenetica: dna.sequenciaGenetica,
              pureza: dna.pureza,
              origemFossil: dna.origemFossil,
              imagemFossil: dna.imagemFossil && Buffer.isBuffer(dna.imagemFossil)
                ? `data:image/png;base64,${dna.imagemFossil.toString('base64')}`
                : null
            }));

            const dinos = dinosRaw.map(dino => ({
              _id: dino._id,
              nome: dino.nome,
              especie: dino.especie,
              idade: dino.idade,
              nivelAgressividade: dino.nivelAgressividade,
              imagem: dino.imagem && Buffer.isBuffer(dino.imagem)
                ? `data:image/png;base64,${dino.imagem.toString('base64')}`
                : null
            }));

            // Mostrar todos os cientistas (ordenados pelos mais recentes)
            const cientistas = cientistasRaw.map(c => ({
              _id: c._id,
              nome: c.nome,
              especialidade: c.especialidade,
              tempoExperiencia: c.tempoExperiencia,
              nivelAcesso: c.nivelAcesso,
              foto: c.foto && Buffer.isBuffer(c.foto)
                ? `data:image/png;base64,${c.foto.toString('base64')}`
                : null
            }));

            const experimentos = expRaw.map(e => ({
              _id: e._id,
              nome: e.nome,
              descricao: e.descricao,
              dataInicio: e.dataInicio ? e.dataInicio.toLocaleDateString('pt-BR') : null,
              imagem: e.imagem && Buffer.isBuffer(e.imagem)
                ? `data:image/png;base64,${e.imagem.toString('base64')}`
                : null
            }));

            res.render('site/index', { dnas, dinos, cientistas, experimentos });
          } catch (err) {
            console.error(err);
            res.render('site/index', { dnas: [], dinos: [], cientistas: [], experimentos: [] });
          }
        };

    }
 }

